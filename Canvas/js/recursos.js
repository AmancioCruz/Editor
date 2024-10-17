const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const opciones = ["cirulo", "cuadrado", "imagen", "pincel"];
const prev_sticker = document.querySelector("#sticker-prev");
const rangoImagen = document.querySelector("#rango-imagen");
let opcion;
let sticker_url = "../recursos/default.png";
let posicionesCursor = [[],[]];
let iniciarTrazo = false;
let dibujos = [];
let circulo;
let sticker;
let cuadrado;

class Rectangulo {
    constructor(id, posicionesCursor , colorlinea, colorrelleno, grozorlinea){
        this.Id = id,
        this.x = Math.min(posicionesCursor[0].x, posicionesCursor[1].x),
        this.y = Math.min(posicionesCursor[0].y, posicionesCursor[1].y),
        this.alto = Math.abs(posicionesCursor[1].y - posicionesCursor[0].y),
        this.ancho = Math.abs(posicionesCursor[1].x - posicionesCursor[0].x),

        this.colorLinea = colorlinea,
        this.colorRelleno = colorrelleno,
        this.grozorLinea = grozorlinea
    }
    Dibujar(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = this.grozorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;

        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
    }
}

class Circulo {
    constructor(id, posicionesCursor, colorlinea, colorrelleno, grozorlinea){
        this.Id = id,
        this.x = posicionesCursor[0].x,
        this.y = posicionesCursor[0].y,
        this.radio = Math.sqrt((posicionesCursor[1].x - posicionesCursor[0].x) **2 + (posicionesCursor[1].y - posicionesCursor[0].y) ** 2),

        this.colorLinea = colorlinea,
        this.colorRelleno = colorrelleno,
        this.grozorLinea = grozorlinea
    }
    Dibujar(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = this.grozorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.strokeStyle = this.colorLinea;

        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

class Sticker{
    constructor(id,url, posX, posY, porcentaje){
        this.Id = id;
        this.imagen = new Image();
        this.imagen.src = url;
        this.ancho = this.imagen.width * (porcentaje/100);
        this.alto = this.imagen.height * (porcentaje/100);
        this.x = posX;
        this.y = posY;
    }
    Dibujar(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height, this.x - (this.ancho/2), this.y - (this.alto/2), this.ancho, this.alto);
    }
}