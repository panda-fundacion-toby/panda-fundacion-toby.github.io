import { config } from './config.js';
import { Card } from './card.js';

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
                    this.data = JSON.parse(data.toJSON());
                    accept(data);
                    const cards = [];
                    for (let index = 0; index < 50; index++) {
                        cards.push(new Card({ key: index, nombre: `nombre ${index}`, pictureurl: 'https://drive.google.com/file/d/1HXq1h4DlUzffEjVnj8T3kJns8ahWuTS-/preview' }));
                    }
                    this.cards = cards;
                });
            });
        });
    }

    count() {
        return this.data.rows.length;
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
