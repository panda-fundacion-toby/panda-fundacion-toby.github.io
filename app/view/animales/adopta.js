import { conejito } from '../../main/src/panda/conejito.js';
import { datosPerritos } from './datosPerritos.js';
const { createApp } = Vue;

datosPerritos.load().then(() => {
    conejito.onBeforeNavigate(() => {
        $('#perritoModal').modal('hide');
    });
    const adoptaAppElement = document.getElementById('adopta-app');
    const currentPage = 0;
    const pageSize = 100;
    const app = createApp({
        data() {
            return {
                total: datosPerritos.count(),
                cards: datosPerritos.getCards(currentPage, pageSize),
                currentPage: 0,
                pageSize: 3,
                vanish: false,
                ready: true,
                currentDog: {}
            }
        },
        methods: {
            previousPage() {
                this.currentPage--;
                this.cards = datosPerritos.getCards(this.currentPage, pageSize);
            },
            nextPage() {
                this.currentPage++;
                this.cards = datosPerritos.getCards(this.currentPage, pageSize);
            },
            showPhoto(key) {
                const found = datosPerritos.cards.find(c => c.key === key);
                if (!found) {
                    return;
                }
                this.currentDog = found;
                $('#perritoModal').modal('toggle');
            },
            preview() {
                this.currentDog.preview();
            },
            next() {
                this.currentDog.next();
            }
        },
        mounted() {
            conejito.wire('.app-rewire');
            const modalImg = document.getElementById('adopta-modal-img');
            modalImg.addEventListener('swiped', (e) => {
                if (e.detail.dir === 'left') {
                    this.currentDog.next();
                } else if (e.detail.dir === 'right') {
                    this.currentDog.preview();
                }
            });
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