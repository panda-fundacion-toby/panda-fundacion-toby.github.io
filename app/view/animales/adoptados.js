import { TIPO_ADOPCION } from './galerias/filtrosTipoAdopcion.js';
import { Galeria } from './galerias/galeria.js';

const galeria = new Galeria({
    filtroInicial: TIPO_ADOPCION.ADOPTADO,
    baseNavigationUrl: '#/animales/adopta'
});
