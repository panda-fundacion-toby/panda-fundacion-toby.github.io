import { config } from './config.js';

class Datos {

    load(query) {
        return new Promise((accept, reject) => {
            try {
                if (this.dataTable) {
                    return accept(this.dataTable);
                }
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(() => {
                    const queryRequest = new google.visualization.Query(config.docUrl);
                    console.log(query);
                    if (query) {
                        queryRequest.setQuery(query);
                    }
                    queryRequest.send((response) => {
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
