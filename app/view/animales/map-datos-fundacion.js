
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

const busca = {
    defaultValue: '',
    columnNumber: 16
};

const salud = {
    defaultValue: 'Ningún problema de salud relevante.',
    columnNumber: 9
};

const talentos = {
    defaultValue: '',
    columnNumber: 18,
    map(value) {
        if (!value || value.trim().length === 0) {
            return [];
        }
        return value.split(',').map(talento => {
            return talento.trim();
        });
    }
};

const tamanoMappings = {
    'Pequeño': 1,
    'Mediano': 2,
    'Grande': 3,
    'Extra grande': 4,
};

const tamano = {
    defaultValue: '',
    columnNumber: 4,
    map(value) {
        for (let key in tamanoMappings) {
            if (value.indexOf(key) >= 0) {
                return tamanoMappings[key];
            }
        }
        return 0;
    }
};

const temperamento = {
    defaultValue: '',
    columnNumber: 6,
    map(value) {
        return value.split(',').filter(s => s.length > 0).map(v => v.trim()).sort();
    }
};

const edad = {
    defaultValue: '',
    columnNumber: 3,
    map(value) {
        if (typeof value === 'number' && value > 2000) {
            const currentYear = new Date().getFullYear();
            return currentYear - value;
        }
        return value;
    }
};

const mappers = [{
    historia,
    nivelDeEnergia,
    nivelDeEnergiaString,
    tamano,
    edad,
    busca,
    temperamento,
    salud,
    talentos
}];

export function map(dataTable, index) {
    const row = {};
    for (const mapperIndex in mappers) {
        const mapper = mappers[mapperIndex];
        for (const mapperName in mapper) {
            const mapperObject = mapper[mapperName];
            const value = dataTable.getValue(index, mapperObject.columnNumber) || mapperObject.defaultValue;
            row[mapperName] = (mapperObject.map && mapperObject.map(value)) || value;
        }
    }
    return row;
}