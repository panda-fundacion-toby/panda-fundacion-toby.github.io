import { datos } from "./datos.js";
import { Card } from './card.js';
import { getImageFromDriveId, getPictureIdFrom, getPicturesFromCellValue } from './dataHelpers.js';
import { map } from './map-datos-fundacion.js';

/**
 * DataTable:
 * https://developers.google.com/chart/interactive/docs/reference#DataTable
 * 
 * getDataTable:
 * https://developers.google.com/chart/interactive/docs/reference#QueryResponse_getDataTable
 */
class DatosPerritos {

    constructor(datos) {
        this.datos = datos;
    }

    async load(filtro) {
        this.dataTable = await this.datos.load(filtro);
        const cards = [];
        for (let index = 0; index < this.dataTable.getNumberOfRows(); index++) {
            const nombre = this.dataTable.getValue(index, 1);
            if (!nombre || nombre.trim() === '') {
                continue;
            }
            const sexo = this.dataTable.getValue(index, 5) || '?';
            const pictures = getPicturesFromCellValue(this.dataTable.getValue(index, 2)) || [];
            const pictureurl = pictures.length ? getImageFromDriveId(getPictureIdFrom(pictures[0])) : './resources/images/nia.png';
            const mappings = map(this.dataTable, index);
            cards.push(new Card({
                key: index,
                nombre,
                pictureurl,
                pictures: pictures.map(p => getImageFromDriveId(getPictureIdFrom(p))),
                sexo,
                demoPictureIndex: 0,
                ...mappings
            }));
        }
        this.cards = cards;
    }

    count() {
        return this.datos.count();
    }

    getCards(page, pageSize) {
        if (!(pageSize > 0)) {
            throw `Illegal pageSize argument. pageSize must be a positive integer. Got ${pageSize} instead.`;
        }
        const count = this.cards.length;
        if (count === 0) {
            return [];
        }
        const numberOfCurrentPages = Math.floor(count / pageSize);
        page = Math.max(0, Math.min(page, numberOfCurrentPages - 1));
        const cards = [];
        for (let index = 0; index < pageSize; index++) {
            let cardIndex = (page * pageSize) + index;
            if (cardIndex >= this.cards.length) {
                break;
            }
            cards.push(this.cards[cardIndex]);
        }
        return cards;
    }
}

export const datosPerritos = new DatosPerritos(datos);