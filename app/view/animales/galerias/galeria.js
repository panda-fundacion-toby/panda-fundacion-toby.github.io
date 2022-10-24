import { conejito } from "../../../main/src/panda/conejito.js";
import { getParamValue } from "../../../main/src/panda/navigationUtils.js";
import { replaceViewHistory } from "../../../main/src/panda/navigation/polar.js";
import { datosPerritos } from "./datosPerritos.js";

const { createApp } = Vue;
export class Galeria {
    constructor(params) {
        const { filtroInicial, baseNavigationUrl } = params;
        (async () => {
            await datosPerritos.load([filtroInicial]);
            const appContainer = document.getElementById('galeria-app');
            const currentPage = 0;
            const pageSize = 500;
            const app = createApp({
                data() {
                    return {
                        total: datosPerritos.count(),
                        cards: datosPerritos.getCards(currentPage, pageSize),
                        ready: true,
                        currentDog: {},
                        shareButtonEnabled: navigator.share,
                    };
                },
                methods: {
                    compartir(card) {
                        if (navigator.share) {
                            navigator.share({
                                title: 'Fundación Toby',
                                text: card.getTextCompartir(),
                                url: window.location.href,
                            }).then(() => console.log('Successful share'))
                                .catch((error) => {
                                    const debug = getParamValue('debug');
                                    console.log(debug);
                                    if (debug) {
                                        alert(error);
                                    }
                                    console.log('Error sharing', error);
                                });
                        }
                    },
                    showPhoto(key) {
                        const found = datosPerritos.cards.find(c => c.key === key);
                        if (found.key !== this.currentDog.key) {
                            this.currentDog = found;
                            this.currentDog.showLoading(true);
                        }
                        $('#perritoModal').modal('toggle');
                        replaceViewHistory(`${baseNavigationUrl}?id=${key}`);
                    },
                    preview() {
                        this.currentDog.previous();
                    },
                    next() {
                        this.currentDog.next();
                    },
                    imageLoaded(card) {
                        card.showLoading(false);
                    },
                    imageError(card) {
                        card.showLoading(false);
                    }
                },
                mounted() {
                    const modalImg = document.getElementById('adopta-modal-img');
                    modalImg.addEventListener('load', () => {
                        this.currentDog.showLoading(false);
                    });
                    modalImg.addEventListener('swiped', (e) => {
                        if (e.detail.dir === 'left') {
                            this.currentDog.next();
                        } else if (e.detail.dir === 'right') {
                            this.currentDog.previous();
                        }
                    });
                    conejito.bindLinks(appContainer);
                    const perritoModal = document.getElementById('perritoModal');
                    $(perritoModal).on('hidden.bs.modal', (e) => {
                        if (perritoModal.dataset.ignoreHidenEvent) {
                            return;
                        }
                        replaceViewHistory(baseNavigationUrl);
                    });
                    document.onkeydown = (e) => {
                        if (!this.currentDog) {
                            return;
                        }
                        switch (e.key) {
                            case 'ArrowLeft':
                                this.currentDog.previous();
                                break;
                            case 'ArrowRight':
                                this.currentDog.next();
                                break;
                            default: return;
                        }
                    };
                    const fotoId = getParamValue('id');
                    if (fotoId) {
                        this.showPhoto(parseInt(getParamValue('id')));
                        const cardElement = document.getElementById(`card-${fotoId}`);
                        if (cardElement) {
                            cardElement.scrollIntoView(true);
                        }
                    }
                }
            });
            app.mount(appContainer);
        })();
    }
}