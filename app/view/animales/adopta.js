import { Card } from './card.js';
import { Datos } from './datos.js';
const { createApp } = Vue;

const datosPerritos = new Datos();
datosPerritos.load().then(() => {
    const element = document.getElementById('adopta-app');
    const currentPage = 0;
    const pageSize = 50;
    createApp({
        data() {
            return {
                total: datosPerritos.count(),
                cards: datosPerritos.getCards(currentPage, pageSize),
                currentPage: 0,
                pageSize: 3,
            }
        },
        methods: {
            previewPage() {
                this.currentPage--;
                // this.cards = [];
                // const elements = document.getElementsByClassName('adopta-card');
                // Array.from(elements).forEach(e => {
                //     e.classList.add('adopta-remove');
                // });
                // setTimeout(() => {
                this.cards = datosPerritos.getCards(this.currentPage, pageSize);
                // }, 200);

            },
            nextPage() {
                this.currentPage++;
                this.cards = datosPerritos.getCards(this.currentPage, pageSize);
            }
        }
    }).mount(element);
    element.classList.remove('adopta-init');
});