export const TIPO_ADOPCION = {
    ADOPTADO: {
        COLUMN_ID: 'G',
        OPERATION: '=',
        VALUE: "'Adoptado'"
    },
    DISPONIBLE: {
        COLUMN_ID: 'G',
        OPERATION: '=',
        VALUE: "'Disponible'"
    },
    FACELLIDO: {
        COLUMN_ID: 'G',
        OPERATION: '=',
        VALUE: "'Fallecido'"
    }
};

export const SEXO = {
    HEMBRA: {
        COLUMN_ID: 'F',
        OPERATION: '=',
        VALUE: "'Hembra'",
    },
    MACHO: {
        COLUMN_ID: 'F',
        OPERATION: '=',
        VALUE: "'Macho'",
    },
};

export const TAMANO = {
    CHICO: {
        COLUMN_ID: 'E',
        OPERATION: 'contains',
        VALUE: "'hasta 15 kg'",
    },
    MEDIANO: {
        COLUMN_ID: 'E',
        OPERATION: 'contains',
        VALUE: "'entre 16 y 29 kg'",
    },
    GRANDE: {
        COLUMN_ID: 'E',
        OPERATION: 'contains',
        VALUE: "'entre 16 y 29 kg'",
    },
    EXTRA_GRANDE: {
        COLUMN_ID: 'E',
        OPERATION: 'contains',
        VALUE: "'entre 16 y 29 kg'",
    },
};