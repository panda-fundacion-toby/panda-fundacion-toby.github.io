import { pmod } from "../../main/src/panda/untercio.js";

export class Card {
    constructor(data) {
        this.key = data.key;
        this.conviveCon = data.conviveCon;
        this.nombre = data.nombre;
        this.nivelDeEnergia = data.nivelDeEnergia;
        this.energiaString = data.energiaString;
        this.energiaRemain = data.energiaRemain;
        this.edad = data.edad;
        this.talentos = data.talentos;
        this.tamano = data.tamano;
        this.tamanoString = data.tamanoString;
        this.temperamento = data.temperamento;
        this.sexo = data.sexo;
        this.sexoString = data.sexoString;
        this.salud = data.salud;
        this.historia = data.historia;
        this.historiaEncoded = encodeURI(data.historia);
        this.busca = data.busca;
        this.pictureurl = data.pictureurl;
        this.pictures = data.pictures;
        this.demoPictureIndex = data.demoPictureIndex;
        this.loading = true;
    }

    get twitterLink() {
        const href = `https://fundacion-toby.org/#animales/adopta/${this.key}`;
        const encodedHref = encodeURIComponent(href);
        const temperamento = (this.temperamento && this.temperamento.join(', ')) || '';
        const text = `¡Adopta a ${this.nombre}!\n${temperamento}\n${href}\n@FundacionToby`;
        const textEncoded = encodeURIComponent(text);
        return `https://twitter.com/intent/tweet?original_referer=${encodedHref}&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=${textEncoded}`;
    }

    get modalPicture() {
        return this.getPictureUrl(this.demoPictureIndex);
    }

    get modalPictureCache() {
        return this.getPictureUrl(this.demoPictureIndex + 1);
    }

    getPictureUrl(index) {
        if (this.pictures.length === 0) {
            return;
        }
        return this.pictures[pmod(index, this.pictures.length)];
    }

    previous() {
        if (this.pictures.length === 0 || this.loading) {
            return;
        }
        this.showLoading(true);
        this.demoPictureIndex = pmod(this.demoPictureIndex - 1, this.pictures.length);
    }

    next() {
        if (this.pictures.length === 0 || this.loading) {
            return;
        }
        this.showLoading(true);
        this.demoPictureIndex = pmod(this.demoPictureIndex + 1, this.pictures.length);
    }

    showLoading(value) {
        clearTimeout(this.loadingTimeoutId);
        if (value) {
            this.loadingTimeoutId = setTimeout(() => {
                this.loading = value;
            }, 300);
        } else {
            this.loading = value;
        }
    }
}