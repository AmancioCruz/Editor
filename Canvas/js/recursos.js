const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const opciones = ["cursor", "pincel", "linea", "cirulo", "cuadrado", "imagen", "borrador"];
const rangoImagen = document.querySelector("#rango-imagen");
const colorLinea = document.querySelector("#seleccionar-color-linea");
const colorRelleno = document.querySelector("#seleccionar-color-relleno");
const imagen_draggable = document.querySelector("#imagen-draggable");
let opcion;
let sticker_url = "../recursos/default.png";
let posicionesCursor = [[],[]];
let iniciarTrazo = false;
let dibujos = [];
let circulo;
let sticker;
let cuadrado;
let url_draggable = "../recursos/default.png";

class Rectangulo {
    constructor(id, posicionesCursor, colorlinea, colorrelleno, grozorlinea){
        this.Id = id,
        this.x = Math.min(posicionesCursor[0].x, posicionesCursor[1].x),
        this.y = Math.min(posicionesCursor[0].y, posicionesCursor[1].y),
        this.alto = Math.abs(posicionesCursor[1].y - posicionesCursor[0].y),
        this.ancho = Math.abs(posicionesCursor[1].x - posicionesCursor[0].x),

        this.colorLinea = colorlinea,
        this.colorRelleno = colorrelleno,
        this.grozorLinea = grozorlinea
    }
    Crear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderizarDiujos();
    
        this.Dibujar();
    }
    Dibujar(){
        ctx.beginPath();
        ctx.strokeStyle = this.colorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.lineWidth = this.grozorLinea;

        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
    }
    EstaDentro(posicionesCursor){}
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
    Crear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderizarDiujos();
    
        this.Dibujar();
    }
    Dibujar(){
        ctx.beginPath();
        ctx.strokeStyle = this.colorLinea;
        ctx.fillStyle = this.colorRelleno;
        ctx.lineWidth = this.grozorLinea;
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
    EstaDentro(posicionesCursor){
        console.log("Verificando si esta dentro " + this.Id);
        const dx = posicionesCursor[1].x - this.x;
        const dy = posicionesCursor[1].y - this.y;
        if(Math.sqrt(dx * dx + dy * dy) <= this.radio){
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.fillStyle = this.colorRelleno;
            ctx.lineWidth = this.grozorLinea;
            ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            return true ;
        }else{
            
            this.Dibujar();
            return false;
        }
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
    Crear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderizarDiujos();

        this.Dibujar();
    }
    Dibujar(){
        ctx.beginPath();
        ctx.drawImage(this.imagen, 0, 0, this.imagen.width, this.imagen.height, this.x - (this.ancho/2), this.y - (this.alto/2), this.ancho, this.alto);
    }
    EstaDentro(posicionesCursor){}
}