import { filtros } from "./filtros.js";
import { SEXO, TAMANO, TIPO_ADOPCION } from "./filtrosPerritos.js";

const result = filtros.transform([[SEXO.HEMBRA, SEXO.MACHO], [TAMANO.CHICO, TAMANO.MEDIANO]]);

const result2 = filtros.transform([['SEXO.HEMBRA', 'SEXO.MACHO'], ['TIPO_ADOPCION.ADOPTADO', 'TIPO_ADOPCION.DISPONIBLE']]);