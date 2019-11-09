//JS Script

window.addEventListener("load", run, false);

function run() {
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  
  //Ball Start position  
  let initX = canvas.width / 2;
  let initY = canvas.height / 2;
  
  let x = initX;
  let y = initY;
  
  //Ball Displacement  
  let dx = 3;
  let dy = dx;
  
  //Ball
  let ballRad = 8;
  let ballHit = false;
  
  //User paddle  
  let paddW = 10;
  let paddH = 50;
  
  let paddHit = false;
  
  let movY = 5;
  
  let userX = 0;
  let userY = (canvas.height / 2) - (paddH / 2);
  
  //PC paddle  
  let pcX = canvas.width - paddW;
  let pcY = userY;
  
  let pcSpeed = 2;
  
  //Paddle movement controls init
  let upKey = false;
  let downKey = false;
  
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
    
    if (x + dx > canvas.width + ballRad) {
      x = 0;
      y = initY;      
    }    
    if (x + dx < 0 - ballRad) {
      x = canvas.width;
      y = initY;      
    }
    
    //Top and bottom bounces
    if (y + dy < ballRad) {
      dy = -dy;
    }
    else if (y + dy > canvas.height - ballRad) {
      dy = -dy;
    }
    
    //User Paddle movement
    if (upKey && (userY) > 0) {
      userY -= movY;
    }
    else if (downKey && userY < (canvas.height - paddH)) {
      userY += movY;
    }
    
    //PC paddle movement
    if (dy < 0 && pcY > 0) {
      pcY -= pcSpeed;
    }
    else if (dy > 0 && pcY < (canvas.height - paddH)) {
      pcY += pcSpeed;
    }
    
    //Draw objects
    drawBall(ballHit);
    drawPadd(userX, userY, paddW, paddH, paddHit);
    drawPadd(pcX, pcY, paddW, paddH, paddHit);
    collDetection(x, y, userX, userY, 0);
    collDetection(x, y, pcX, pcY, canvas.width);
  
  }//End draw
  
  function drawBall(ballHit) {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
  }
  
  function drawPadd(paddX, paddY, paddW, paddH, paddHit) {
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
  
  function keyUpFn(evt) {
    switch (evt.keyCode) {
      case 38: //up arrow
      upKey = false;
      break;
      
      case 40: //down arrow
      downKey = false;
      break;
      
      default:
      return false;
    }
  }
  
  function collDetection(ballX, ballY, paddX, paddY, limitX) {
    let limitTop = paddY;
    let limitBott = paddY + paddH;    
  
    if (ballX == limitX) {
      if (ballY > limitTop && ballY < limitBott) {
        dx = -dx;
      }
    }    
    return;
  }
  
} //End run
