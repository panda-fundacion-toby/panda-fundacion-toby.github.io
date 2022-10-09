
const conviveCon = {
    defaultValue: '',
    columnNumber: 10,
    map(value) {
        return value;
    }
};

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

const energiaRemain = {
    defaultValue: 0,
    columnNumber: 7,
    map(value) {
        return ((Object.keys(nivelEnergiaMappings).length) - nivelEnergiaMappings[value]);
    }
};

const energiaString = {
    defaultValue: '',
    columnNumber: 7,
    map(value) {
        return value;
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

const sexoString = {
    defaultValue: '',
    columnNumber: 5
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const talentos = {
    defaultValue: '',
    columnNumber: 18,
    map(value) {
        if (!value || value.trim().length === 0) {
            return [];
        }
        return value.split(',').map(talento => {
            return capitalizeFirstLetter(talento.trim());
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

const tamanoString = {
    defaultValue: '',
    columnNumber: 4
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

const anoNacimientoAproximado = {
    columnNumber: 3,
    map(value) {
        return `${value}`;
    }
};

const nombre = {
    columnNumber: 1
};

const sexo = {
    columnNumber: 5
};

const IMAGE_FILE_PREFIX = 'https://drive.google.com/file/d/';
const IMAGE_FILE_SUFIX = '/view?usp=sharing';
const IMAGE_OPEN_PREFIX = 'https://drive.google.com/open?id=';

const pictures = {
    columnNumber: 25,
    defaultValue: '',
    map(value) {
        let imageIds = [];
        // https://drive.google.com/file/d/1XWRm4Z7cQK-Zv4pv1GcEaNgZzc8nZW53/view?usp=sharing
        if (value.indexOf('usp=sharing') >= 0) {
            const items = value.split(',').
                map(v => v.trim()).
                map(i => i.substring(IMAGE_FILE_PREFIX.length)).
                map(i => i.substring(0, i.indexOf(IMAGE_FILE_SUFIX)));
            imageIds.push(...items);
        } else {
            // https://drive.google.com/open?id=1fQjlr-a2ljlCWhWEDmGcy_1_UC4EX49O
            const items = value.split(',').
                map(v => v.trim()).
                map(i => i.substring(IMAGE_OPEN_PREFIX.length));
            imageIds.push(...items);
        }
        // https://drive.google.com/uc?export=view&id=1XWRm4Z7cQK-Zv4pv1GcEaNgZzc8nZW53
        const result = imageIds.map(imageId => `https://drive.google.com/uc?export=view&id=${imageId}`);
        return result;
    }
};

const mappers = {
    anoNacimientoAproximado,
    busca,
    conviveCon,
    energiaRemain,
    energiaString,
    edad,
    historia,
    nivelDeEnergia,
    nombre,
    salud,
    sexo,
    sexoString,
    pictures,
    tamano,
    tamanoString,
    temperamento,
    talentos
};

export function map(dataTable, index) {
    const row = {};
    for (const [mapperName, mapper] of Object.entries(mappers)) {
        const value = dataTable.getValue(index, mapper.columnNumber) || mapper.defaultValue;
        const mappedValue = (mapper.map && mapper.map(value)) ?? value;
        row[mapperName] = mappedValue;
    }
    return row;
}