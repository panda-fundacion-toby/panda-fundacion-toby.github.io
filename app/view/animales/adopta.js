import { TIPO_ADOPCION } from './galerias/filtrosPerritos.js';
import { Galeria } from './galerias/galeria.js';

const galeria = new Galeria({
    filtroInicial: TIPO_ADOPCION.DISPONIBLE,
    baseNavigationUrl: '#/animales/adopta'
});
