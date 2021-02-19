const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = window.innerHeight - 150;


let context = canvas.getContext("2d");
let start_color = "white";
context.fillStyle = start_color;
context.fillRect(0,0, canvas.width, canvas.height);
// face culoarea alba a dreptunghiului

let draw_color = "black";
let draw_width = "2";
let is_drawing  = false;
let eraseb = false;

let restore_array = [];
let index = -1;
 


function change_color(element){
    draw_color = element.style.background;
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
// cand atinge ecranul mouseul

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
//cand paraseste 

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop , false);


//cand dai click , ia coordonatele pozitiei cursorului
function start (event){
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop);
    event.preventDefault();
}

// incepe sa deseneze urmarind traiectoria cursorului
function draw(event){
    if (is_drawing){
        context.lineTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();
    
}
// se opreste cand mouseul este eliberat
function stop(event){
    if (is_drawing){
        context.stroke();
        context.closePath();
        is_drawing=false;
    }
    event.preventDefault();
    if (event.type != 'mouseout'){
       restore_array.push(context.getImageData(0,0,canvas.width, canvas.height));
       index +=1;
   }
}

//cand dai click , ia coordonatele pozitiei cursorului



function clear_canvas() {
    context.fillStyle = start_color;
    context.clearRect(0,0,canvas.width, canvas.height);
    context.fillRect(0,0,canvas.width, canvas.height);
    restore_array=[];
    index = -1;
}
function undo_last(){
    if (index <= 0 ){
        clear_canvas();
    } else 
    {
        index-=1;
        restore_array.pop();
        context.putImageData(restore_array[index],0, 0 );
        console.log("hi");
    }
}
function change_cursor(){
   draw_color="white";
   draw_width="20";
   document.getElementById("canvas").style.cursor = "wait";
   
}

function defaullt(){
    draw_color="black";
    draw_width="2";
    document.getElementById("canvas").style.cursor = "auto";
}





