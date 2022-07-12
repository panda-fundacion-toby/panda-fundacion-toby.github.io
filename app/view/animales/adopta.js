import { Datos } from './datos.js';
const { createApp } = Vue;

const datosPerritos = new Datos();
datosPerritos.load().then(() => {
    const adoptaAppElement = document.getElementById('adopta-app');
    const currentPage = 0;
    const pageSize = 100;
    createApp({
        data() {
            return {
                total: datosPerritos.count(),
                cards: datosPerritos.getCards(currentPage, pageSize),
                currentPage: 0,
                pageSize: 3,
                ready: true
            }
        },
        methods: {
            previewPage() {
                this.currentPage--;
                this.cards = datosPerritos.getCards(this.currentPage, pageSize);
            },
            nextPage() {
                this.currentPage++;
                this.cards = datosPerritos.getCards(this.currentPage, pageSize);
            }
        }
    }).mount(adoptaAppElement);
    adoptaAppElement.classList.remove('adopta-init');
}).catch(error => {
    console.trace(error);
    const elements = document.getElementsByClassName('cargando');
    console.log(elements);
    Array.from(elements).forEach(e => {
        e.classList.add('app-hide');
    });
});