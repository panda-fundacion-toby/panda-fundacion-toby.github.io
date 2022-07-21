import { config } from './config.js';
import { Card } from './card.js';
import { getImageFromDriveId, getPictureIdFrom, getPicturesFromCellValue } from './dataHelpers.js';
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
                            const historia = this.dataTable.getValue(index, 2);
                            const nivelDeEnergia = this.dataTable.getValue(index, 3) || 1;
                            const edad = this.dataTable.getValue(index, 4) || 1;
                            const sexo = this.dataTable.getValue(index, 5) || '?';
                            const tamano = this.dataTable.getValue(index, 6) || 1;
                            const pictures = getPicturesFromCellValue(this.dataTable.getValue(index, 7)) || [];
                            const pictureurl = pictures.length ? getImageFromDriveId(getPictureIdFrom(pictures[0])) : './resources/images/nia.png';
                            cards.push(new Card({
                                key: index,
                                nombre,
                                pictureurl,
                                pictures: pictures.map(p => getImageFromDriveId(getPictureIdFrom(p))),
                                historia,
                                nivelDeEnergia,
                                edad,
                                sexo,
                                tamano,
                                demoPictureUrl: pictureurl,
                                demoPictureIndex: 0
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
        // const totalPages = Math.floor(this.cards.length / pageSize);
        const actualPage = Math.min(this.cards.length - 1, Math.max(0, page));
        const start = actualPage * pageSize;
        const cards = [];
        for (let index = start; index < (start + pageSize) && (index < this.cards.length); index++) {
            cards.push(this.cards[index]);
        }
        return cards;
    }
}
