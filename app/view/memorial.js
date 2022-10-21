import { TIPO_ADOPCION } from "./animales/galerias/filtrosTipoAdopcion.js";
import { Galeria } from "./animales/galerias/galeria.js";

const galeria = new Galeria({
    filtroInicial: TIPO_ADOPCION.FACELLIDO,
    baseNavigationUrl: '#/memorial'
});