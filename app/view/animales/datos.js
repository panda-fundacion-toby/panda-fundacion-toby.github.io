import { config } from './config.js';

class Datos {

    load(filtro) {
        return new Promise((accept, reject) => {
            try {
                if (this.dataTable) {
                    return accept(this.dataTable);
                }
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(() => {
                    new google.visualization.Query(config.docUrl).send((response) => {
                        this.dataTable = response.getDataTable();
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
}

export const datos = new Datos();