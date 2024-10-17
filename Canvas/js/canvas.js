/*/ Dibujar una línea
ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.moveTo(0, 0);
    ctx.lineTo(50, 50);
    ctx.stroke();*/
       
function alHacerClick(event){
    posicionesCursor[0] = {
            x: event.offsetX,
            y: event.offsetY
        }
    iniciarTrazo = true;    
}


function move(event){
    posicionesCursor[1]={
        x: event.offsetX,
        y: event.offsetY 
    }
    if(iniciarTrazo && opcion === 4){
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 15;
        ctx.moveTo(posicionesCursor[0].x, posicionesCursor[0].y);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    
        posicionesCursor[0]={
            x: event.offsetX,
            y: event.offsetY 
        }
    }
    if(opcion == 3){
        sticker = new Sticker(1, sticker_url, event.offsetX, event.offsetY, rangoImagen.value);
        sticker.Dibujar();
    }
    if(iniciarTrazo && opcion == 2){

        cuadrado = new Rectangulo(1, posicionesCursor, "green", "red", 15);
        cuadrado.Dibujar();
    }
    if(iniciarTrazo && opcion == 1){

        circulo = new Circulo(1, posicionesCursor, "red", "pink", 15);
        circulo.Dibujar();
    }
}

function leave(){
    iniciarTrazo = false;
}

function alSoltarClick(event){
    posicionesCursor[1] = {
            x: event.offsetX,
            y: event.offsetY
        }

    iniciarTrazo = false;    
}

function SeleccionarOpcion(event, opcionUsuario){
    if(opcionUsuario == opciones[0]){
        opcion = 1;
        console.log(opciones[0]);
    }
    if(opcionUsuario == opciones[1]){
        opcion = 2;
        console.log(opcion);
        console.log(opciones[1]);
    }
    if(opcionUsuario == opciones[2]){
        opcion = 3;
        console.log(opcion);
        console.log(opciones[2]);
    }
    if(opcionUsuario == opciones[3]){
        opcion = 4;
        console.log(opcion);
        console.log(opciones[3]);
    }
    for( let i = 0; i < event.target.parentNode.children.length; i++){
        event.target.parentNode.children[i].classList.remove("btn-cambio-activado");
        event.target.parentNode.children[i].classList.add("btn-cambio");
    }
   event.target.classList.add("btn-cambio-activado");
}

function DibujarFigura(event){
    if(opcion === 1){
        console.log("Dibujando circulo");
        //asignamos el valor del id sumandole el largo del arreglo
        circulo.Id = circulo.Id + dibujos.length;
        dibujos.push(circulo);
        circulo.Dibujar();
    }
    if(opcion === 2 ){
        console.log("Dibujando cuadrado");
        cuadrado.Dibujar();
    }
    if(opcion === 3){
        console.log("Dibujar Imagen");
        //asignamos el id al situcker y dibujamos la figura
        sticker.Id = sticker.Id + dibujos.length;
        dibujos.push(sticker);
        //dibujar el sticker cuando se hace click
        sticker.Dibujar();

    }
    if(opcion === 4){
        console.log("dibujar con el pincel");
    }
    
    console.log(dibujos);
}

function cargarImagen(event){
    let imgUrl;
    if(event.target.files[0]){
        console.log(event.target.files[0].type);
        if(event.target.files[0].type === "image/png"){
            const reader = new FileReader();
            reader.onload = (event) => {
                imgUrl = event.target.result;
                prev_sticker.style.backgroundImage = `Url(${imgUrl})`;
                sticker_url = imgUrl;
                //console.log(imgUrl);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
}

