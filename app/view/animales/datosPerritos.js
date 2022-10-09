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

    async load(filtros = []) {
        let query = 'select *';
        const whereCondition = filtros.map(filtro => {
            return `${filtro.COLUMN_ID} ${filtro.OPERATION} ${filtro.VALUE}`;
        });
        if (whereCondition.length > 0) {
            query = `select * where ${whereCondition}`;
        }
        this.dataTable = await this.datos.load(query);
        const cards = [];
        for (let index = 0; index < this.dataTable.getNumberOfRows(); index++) {
            const mappings = map(this.dataTable, index);
            cards.push(new Card({
                key: index,
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
