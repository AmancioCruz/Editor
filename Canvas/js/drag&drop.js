canvas.addEventListener("dragover",(event)=>{
    event.preventDefault();
});

canvas.addEventListener("drop",()=>{
    console.log("drop");
    console.log(url_draggable);
    let img = new Image();
    img.src = url_draggable;
    console.log(img.src);
    ctx.beginPath();
    ctx.drawImage(img, 0, 0, img.width, img.height, 0,0, canvas.width, canvas.height);
});