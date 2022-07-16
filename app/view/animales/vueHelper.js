import { datosPerritos } from './datosPerritos.js';
const { createApp } = Vue;

export function createAppPerritos(App, elementId) {
    datosPerritos.load().then(() => {
        const adoptaAppElement = document.getElementById(elementId);
        createApp(App).mount(adoptaAppElement);;
        adoptaAppElement.classList.remove('app-hide');
    }).catch(error => {
        console.trace(error);
        const elements = document.getElementsByClassName('cargando');
        console.log(elements);
        Array.from(elements).forEach(e => {
            e.classList.add('app-hide');
        });
    });

}