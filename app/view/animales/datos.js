import { config } from './config.js';
import { Card } from './card.js';
import { getImageFromDriveId, getPictureIdFrom, getPicturesFromCellValue } from './dataHelpers.js';
import { map } from './map-datos-fundacion.js';
// import { DataTable } from './dataTable.js';

/**
 * DataTable:
 * https://developers.google.com/chart/interactive/docs/reference#DataTable
 * 
 * getDataTable:
 * https://developers.google.com/chart/interactive/docs/reference#QueryResponse_getDataTable
 */
export class Datos {

    load() {
        if (this.dataTable) {
            return Promise.resolve(this.dataTable);
        }
        return new Promise((accept, reject) => {
            try {
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(() => {
                    new google.visualization.Query(config.docUrl).send((response) => {
                        const dataTable = response.getDataTable();
                        this.dataTable = dataTable;
                        const cards = [];
                        for (let index = 0; index < this.dataTable.getNumberOfRows(); index++) {
                            const nombre = this.dataTable.getValue(index, 1);
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
                                demoPictureUrl: pictureurl,
                                demoPictureIndex: 0,
                                ...mappings
                            }));
                        }
                        this.cards = cards;
                        accept(this.dataTable);
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    count() {
        return this.dataTable.getNumberOfRows();
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
