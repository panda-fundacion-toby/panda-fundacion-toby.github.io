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
        this.busca = data.busca;
        this.pictureurl = data.pictureurl;
        this.pictures = data.pictures;
        this.demoPictureUrl = data.demoPictureUrl;
        this.demoPictureIndex = data.demoPictureIndex;
    }

    get nextDemoPictureUrl() {
        return this.getPictureUrl(this.demoPictureIndex + 1);
    }

    getPictureUrl(index) {
        if (this.pictures.length === 0) {
            return;
        }
        return this.pictures[pmod(index, this.pictures.length)];
    }

    preview() {
        if (this.pictures.length === 0) {
            return;
        }
        this.demoPictureIndex = pmod(this.demoPictureIndex - 1, this.pictures.length)
        this.demoPictureUrl = this.getPictureUrl(this.demoPictureIndex);
    }

    next() {
        if (this.pictures.length === 0) {
            return;
        }
        this.demoPictureIndex = pmod(this.demoPictureIndex + 1, this.pictures.length)
        this.demoPictureUrl = this.getPictureUrl(this.demoPictureIndex);
    }
}