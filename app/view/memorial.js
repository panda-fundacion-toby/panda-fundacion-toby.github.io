import { datosPerritos } from "./animales/datosPerritos.js";
import { TIPO_ADOPCION } from "./animales/filtrosTipoAdopcion.js";
const { createApp } = Vue;

(async () => {
    await datosPerritos.load([TIPO_ADOPCION.FACELLIDO]);
    const appContainer = document.getElementById('memorial-app');
    const currentPage = 0;
    const pageSize = 500;
    const app = createApp({
        data() {
            return {
                total: datosPerritos.count(),
                cards: datosPerritos.getCards(currentPage, pageSize),
                ready: true
            };
        }
    });
    app.mount(appContainer);
})();