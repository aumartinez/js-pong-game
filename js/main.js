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
  
  let gameTime = 0;
  
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
  
  //Scores
  let userScore = 0;
  let pcScore = 0;
  
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
    
    if (x > canvas.width) {
      x = 0 + 15;
      y = initY;
      userScore++;
      if(userScore == 10) {        
        clearInterval(canvasDraw);
        alert("You Wont");
        document.location.reload();
      }
    }    
    if (x < 0) {
      x = canvas.width - 15;
      y = initY;
      pcScore++;
      if(pcScore == 10) {        
        clearInterval(canvasDraw);
        alert("You Lost");
        document.location.reload();
      }
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
    drawUserScore();
    drawPcScore();
    drawLabel();
    collDetection(x, y, userX, userY);
    collDetection(x, y, pcX, pcY);    
  
  }//End draw
  
  function drawBall(ballHit) {
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0 * Math.PI, 2 * Math.PI);
    let ballColor = (ballHit)? "red" : "#000";    
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
  }
  
  function drawPadd(paddX, paddY, paddW, paddH, paddHit) {
    ctx.beginPath();
    ctx.rect(paddX, paddY, paddW, paddH);
    let paddColor = (paddHit)? "#555" : "#000";
    ctx.fillStyle = paddColor;
    ctx.fill();
    ctx.closePath();
  }
  
  function drawUserScore(){
    ctx.font = "40px Quantico";
    ctx.fillStyle = "#555";
    ctx.fillText(userScore, 45, 45);
  }
  
  function drawPcScore() {
    ctx.font = "40px Quantico";
    ctx.fillStyle = "#555";    
    ctx.fillText(pcScore, canvas.width - 45, 45);
  }
  
  function drawLabel() {
    ctx.font = "40px Quantico";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("Best of 10", canvas.width/2, 45);
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
  
  function collDetection(ballX, ballY, paddX, paddY) {
    let limitTop = paddY;
    let limitBott = paddY + paddH;
    let limitRight = paddX;
    let limitLeft = paddX + paddW;
    
    if(ballX < limitLeft && ballX > limitRight) {
      if(ballY < limitBott && ballY > limitTop) {
        dx = -dx;
        ballHit = true;
        paddHit = true;
      }  
    }
    else {
      ballHit = false;
      paddHit = false;
    }
    
    return;
  }
  
} //End run
