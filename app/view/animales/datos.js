import { config } from './config.js';

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
                });
            });
        });
    }

    count() {
        return this.data.rows.length;
    }
}