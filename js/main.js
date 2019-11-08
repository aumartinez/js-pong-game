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
  
  //User paddle  
  let paddW = 10;
  let paddH = 50;
  
  let userX = 0;
  let userY = (canvas.height / 2) - (paddH / 2);
  
  //PC paddle  
  let pcX = canvas.width - paddW;
  let pcY = userY;
  
  //Listeners
  document.addEventListener("keydown", keyDownFn, false);
  document.addEventListener("keyup", keyUpFn, false);
  
  //Canvas redraw
  let time = 10;
  let canvasDraw = setInterval(draw, time);
  
  function draw() {
    
    //Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //Move ball - ball limits
    
    x += dx;
    y += dy;
    
    if (x + dx > canvas.width - ballRad || x + dx < ballRad) {
      dx = -dx;
    }
    if (y + dy < ballRad) {
      dy = -dy;
    }
    else if (y + dy > canvas.height - ballRad) {
      dy = -dy;
    }
    
    //Draw objects
    drawBall();
    drawPadd(userX, userY, paddW, paddH);
    drawPadd(pcX, pcY, paddW, paddH);
  
  }//End draw
  
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
  }
  
  function drawPadd(paddX, paddY, paddW, paddH) {
    ctx.beginPath();
    ctx.rect(paddX, paddY, paddW, paddH);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
  }
  
  function keyDownFn(evt) {
    switch (evt.keyCode) {
      case 38: //up arrow
      upKey = true;
      break;
      
      case 40: //down arrow
      downKey = true;
      break;
      
      default:
      return false;
    }
  }
  
} //End run
