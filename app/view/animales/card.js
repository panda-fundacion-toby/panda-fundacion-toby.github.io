import { pmod } from "../../main/src/panda/untercio.js";

export class Card {
    constructor(data) {
        Object.assign(this, data);
        this.pictureurl = this.pictures[0] ?? './resources/images/nia.png';
        this.loading = true;
        this.demoPictureIndex = 0;
    }

    get twitterLink() {
        const href = `https://fundacion-toby.org/#animales/adopta?id=${this.key}`;
        const encodedHref = encodeURIComponent(href);
        const temperamento = (this.temperamento && this.temperamento.join(', ')) || '';
        const text = `¡Adopta a ${this.nombre}!\n${temperamento}\n${href}\n@FundacionToby #adoptaft`;
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
        if (this.pictures.length <= 1 || this.loading) {
            return;
        }
        this.showLoading(true);
        this.demoPictureIndex = pmod(this.demoPictureIndex - 1, this.pictures.length);
    }

    next() {
        if (this.pictures.length <= 1 || this.loading) {
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