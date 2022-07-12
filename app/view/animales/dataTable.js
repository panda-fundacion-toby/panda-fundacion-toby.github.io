export class DataTable {
    constructor(data) {
        this.data = data;
    }

    getCols() {
        return this.data.bf;
    }

    getRows() {
        return this.data.Wf;
    }

    count() {
        return this.getRows().length;
    }

    getElement(index) {
        return this.getRows()[index];
    }
}