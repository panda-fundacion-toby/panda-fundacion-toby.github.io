
const nivelEnergiaMappings = {
    'Nivel de energía alto (caminatas, juego y otras actividades extra)': 3,
    'Nivel de energía medio (caminatas diarias y juego)': 2,
    'Nivel de energía bajo (caminatas diarias son suficientes)': 1
};

const nivelDeEnergia = {
    defaultValue: 1,
    columnNumber: 7,
    map(value) {
        return nivelEnergiaMappings[value];
    }
};

const nivelDeEnergiaString = {
    defaultValue: 1,
    columnNumber: 7,
    map(value) {
        return nivelEnergiaMappings[value];
    }
};

const historia = {
    defaultValue: '',
    columnNumber: 14,
    map(value) {
        return value.trim();
    }
};

const mappers = [{
    nivelDeEnergia,
    nivelDeEnergiaString,
    historia
}];

export function map(dataTable, index) {
    const row = {};
    for (const mapperIndex in mappers) {
        const mapper = mappers[mapperIndex];
        for (const mapperName in mapper) {
            const mapperObject = mapper[mapperName];
            const value = dataTable.getValue(index, mapperObject.columnNumber) || mapperObject.defaultValue;
            row[mapperName] = mapperObject.map(value);
        }
    }
    return row;
}