import { getParamValue } from "../../../main/src/panda/navigationUtils.js";
import { SEXO, TAMANO } from "./filtrosPerritos.js";

const MAP_URL_FILTROS = {
    's:m': SEXO.MACHO,
    's:h': SEXO.HEMBRA,
    't:0': TAMANO.CHICO,
    't:1': TAMANO.MEDIANO,
    't:2': TAMANO.GRANDE,
    't:3': TAMANO.EXTRA_GRANDE,
};

class Filtros {

    /**
     * Returns a list of filters from the URL.
     * localhost:8082/#/animales/adopta&f=s:m,s:h,t:0,t:1,ne:0,ne:1
     * @returns 
     */
    getFiltros() {
        const url = getParamValue('f');
        if (!url) {
            return new Map();
        }
        const filtrosByColumnId = url.split(',').map(token => MAP_URL_FILTROS[token]).reduce((map, filtro) => {
            const list = map.get(filtro.COLUMN_ID) || [];
            list.push(filtro);
            map.set(filtro.COLUMN_ID, list);
            return map;
        }, new Map());
        return filtrosByColumnId;
    }

    updateFiltros(filtro) {

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