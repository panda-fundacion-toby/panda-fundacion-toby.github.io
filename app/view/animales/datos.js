import { config } from './config.js';
import { Card } from './card.js';
import { DataTable } from './dataTable.js';

/**
 * https://developers.google.com/chart/interactive/docs/reference#DataTable
 */
export class Datos {

    load() {
        google.charts.load('current', { 'packages': ['corechart'] });
        return new Promise((accept) => {
            google.charts.setOnLoadCallback(() => {
                const query = new google.visualization.Query(config.docUrl);
                query.send((response) => {
                    const data = response.getDataTable();
                    this.dataTable = new DataTable(data);
                    const cards = [];
                    for (let index = 0; index < this.dataTable.count(); index++) {
                        const perrito = this.dataTable.getElement(index);
                        const nombre = perrito.c[1].v;
                        const historia = perrito.c[2].v;
                        cards.push(new Card({
                            key: index,
                            nombre,
                            pictureurl: './resources/images/mockita-01.jpeg',
                            historia
                        }));
                    }
                    this.cards = cards;
                    accept(this.dataTable);
                });
            });
        });
    }

    count() {
        return this.dataTable.count();
    }

    getCards(page, pageSize) {
        const totalPages = Math.floor(this.cards.length / pageSize);
        const actualPage = Math.min(this.cards.length - 1, Math.max(0, page));
        const start = actualPage * pageSize;
        const cards = [];
        for (let index = start; index < (start + pageSize) && (index < this.cards.length); index++) {
            cards.push(this.cards[index]);
        }
        return cards;
    }
}
