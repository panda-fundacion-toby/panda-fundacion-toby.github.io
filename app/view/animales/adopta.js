import { Datos } from './datos.js';
import { createApp } from 'vue';

const datosPerritos = new Datos();
datosPerritos.load().then(() => {
    createApp({
        data() {
            return {
                total: datosPerritos.count()
            }
        }
    }).mount('#adopta');
    const element = document.getElementById('adopta');
    element.classList.remove('adopta-init');
});