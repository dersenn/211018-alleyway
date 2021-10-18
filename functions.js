function createBricks() {
    brickWidth = windowWidth / brickCols
    brickHeight = 10
    for (let y = 0; y < brickRows; y++) {
        yOff = 0 + y * brickHeight
        for (let x = 0; x < brickCols; x++) {
            xOff = yLimitTop + x * brickWidth
            theBricks.push( new Brick(xOff,yOff,brickWidth,brickHeight,{r: 0, g: 0, b:255}) )
        }
    }
}

function drawBricks() {
    for (let brick = 0; brick < theBricks.length; brick++) {
        theBricks[brick].drawBrick()
    }
}

function drawLimit() {
    push()
    stroke(0,255,0,255)
    line(0,yLimitTop,windowWidth,yLimitTop)
    pop()
}

function checkScore() {
    //increase score and speed. but only if game is on.
    if (gameOn) {
        score ++

        //increase level after every 5 successful hits. and increase speed.
        if (score % 3 == 0) {
            // increase Level Count
            level++
            //speed acceleration
            speedY += speedY*0.1
            //make playground smaller
            yLimitTop += heightBar
        }
    }
}

function drawBar() {
    //bar move by arrow-keys
    if (keyIsDown(LEFT_ARROW) && xBar > 0) {
        xBar -= 10
    }
    if (keyIsDown(RIGHT_ARROW) && xBar < windowWidth - widthBar) {
        xBar += 10
    }
    fill(255)
    rect(xBar, windowHeight - heightBar, widthBar, heightBar)
}

function drawBall() {
    //ball movements
    //ball hits left/right wall
    if (xBall > windowWidth - sizeBall/2 || xBall < sizeBall/2 ){
        speedX = -speedX
    }
    //ball hits top wall
    if (yBall < yLimitTop + sizeBall/2 ){
        speedY = -speedY
    }
    //ball hits the bar, yay!
    if (yBall > yLimitBottom - sizeBall/2 
        && xBall > xBar 
        && xBall < xBar + widthBar){
            speedY = -speedY
            checkScore()
    }
    //fail!
    if (yBall > windowHeight - sizeBall/2){
        speedY = 0
        speedX = 0
        fill(255,0,0)
        yBall = windowHeight - sizeBall/4
        //Game Over
        gameOn = false
    }
    ellipse(xBall,yBall,sizeBall)

    xBall += speedX
    yBall += speedY
}
