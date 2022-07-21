
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
        this.demoPictureUrl = data.demoPictureUrl;
        this.demoPictureIndex = data.demoPictureIndex;
    }

    preview() {
        if(this.pictures.length === 0){
            return;
        }
        this.demoPictureIndex = Math.max(0, this.demoPictureIndex - 1);
        this.demoPictureUrl = this.pictures[this.demoPictureIndex];
    }

    next() {
        if(this.pictures.length === 0){
            return;
        }
        this.demoPictureIndex = Math.min(this.pictures.length - 1, this.demoPictureIndex + 1);
        this.demoPictureUrl = this.pictures[this.demoPictureIndex];
    }
}