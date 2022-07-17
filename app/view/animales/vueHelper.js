import { datosPerritos } from './datosPerritos.js';
const { createApp } = Vue;

function createAppAndShow(App, elementId) {
    const adoptaAppElement = document.getElementById(elementId);
    createApp(App).mount(adoptaAppElement);;
    adoptaAppElement.classList.remove('app-hide');
}

export function createAppPerritos(App, elementId) {
    datosPerritos.load().then(() => {
        createAppAndShow(App, elementId);
    }).catch(error => {
        console.trace(error);
        const elements = document.getElementsByClassName('cargando');
        console.log(elements);
        Array.from(elements).forEach(e => {
            e.classList.add('app-hide');
        });
    });
}

export function createAppViewContainer(App) {
    createAppAndShow(App, 'viewContainer');
}