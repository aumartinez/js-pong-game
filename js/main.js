//JS Script

window.addEventListener("load", run, false);

function run() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  
  //Start position
  
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  
  //Displacement
  
  let dx = 2;
  let dy = 2;
  
  //Ball
  let ballRad = 8;
  
  //Canvas redraw
  let time = 10;
  let canvasDraw = setInterval(draw, time);  
  
  function draw() {
    
    //Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //Draw objects
    drawBall();
  
  }//End draw
  
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
  }
  
} //End run
