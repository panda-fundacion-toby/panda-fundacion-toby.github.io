
export class Card {
    constructor(data) {
        this.key = data.key;
        this.nombre = data.nombre;
        this.nivelDeEnergia = data.nivelDeEnergia;
        this.edad = data.edad;
        this.tamano = data.tamano;
        this.sexo = data.sexo;
        this.historia = data.historia;
        this.pictureurl = data.pictureurl;
        this.pictures = data.pictures;
    }

    get masinfo() {
        return `#animales/show/?id=${this.key}`
    }
}