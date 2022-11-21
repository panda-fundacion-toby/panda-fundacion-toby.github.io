import { hashParams } from "../../../main/src/panda/hashParams.js";
import { NIVEL_ENERGIA, SEXO, TAMANO } from "./filtrosPerritos.js";

const MAP_URL_FILTROS = {
    's:m': SEXO.MACHO,
    's:h': SEXO.HEMBRA,
    't:0': TAMANO.CHICO,
    't:1': TAMANO.MEDIANO,
    't:2': TAMANO.GRANDE,
    't:3': TAMANO.EXTRA_GRANDE,
    'ne:0': NIVEL_ENERGIA.BAJO,
    'ne:1': NIVEL_ENERGIA.MEDIO,
    'ne:2': NIVEL_ENERGIA.ALTO
};

class Filtros {

    getFiltrosUrl() {
        return hashParams.get('f');
    }

    urlContains(filtro) {
        const urlValue = this.getFiltrosUrl();
        return urlValue ? urlValue.indexOf(filtro) >= 0 : false;
    }

    /**
     * Returns a list of filters from the URL.
     * localhost:8082/#/animales/adopta?f=s:m,s:h,t:0,t:1,ne:0,ne:1
     * @returns 
     */
    getFiltros() {
        const url = hashParams.get('f');
        if (!url) {
            return new Map();
        }
        const filtrosByColumnId = url.split(',').map(
            token => MAP_URL_FILTROS[token]
        ).reduce((map, filtro) => {
            const list = map.get(filtro.COLUMN_ID) || [];
            list.push(filtro);
            map.set(filtro.COLUMN_ID, list);
            return map;
        }, new Map());
        return filtrosByColumnId;
    }

    toggleFiltro(filtro) {
        let currentValue = hashParams.get('f');
        let filtros = currentValue ? currentValue.split(',') : [];
        if (filtros.some(f => f === filtro)) {
            filtros = filtros.filter(f => f !== filtro);
        } else {
            filtros.push(filtro);
        }
        hashParams.set('f', filtros.join(','));
        hashParams.updateUrl();
    }

    mapFiltroToString(filtro) {
        return `${filtro.COLUMN_ID} ${filtro.OPERATION} ${filtro.VALUE}`;
    }

    query(filtrosByColumnId) {
        const buffer = [];
        for (const filtros of filtrosByColumnId.values()) {
            const filtroString = filtros.map(filtro => this.mapFiltroToString(filtro));
            buffer.push(`(${filtroString.join(' OR ')})`);
        }
        return `(${buffer.join(' AND ')})`;
    }
}

export const filtros = new Filtros();