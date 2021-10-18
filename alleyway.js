//game on?
let gameOn = true

//initialize score
let score = 0

//level up?
let level = 1

//yLimit for increased difficulty (limit playground)
let yLimitTop = 0

//ball parameters
let xBall = 0
let yBall = 0
let sizeBall = 10
let speedX = 2
let speedY = 7

//bar parameters
let heightBar = 10
let widthBar = 100
let xBar

function setup() {
    createCanvas(windowWidth, windowHeight);

    // bar start
    xBar = windowWidth/2 - widthBar/2

    //ball start
    xBall = random(sizeBall/2,windowWidth-sizeBall/2)
    yBall = sizeBall

    //score (text) parameters go here. size, position, font...
    textSize(60)
    textAlign(CENTER)
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

function makeBar() {
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

function makeBall() {
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
    if (yBall > windowHeight - (sizeBall/2 + heightBar) 
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

function draw() {
    background(0,0,0,50);

    //display score
    text(score, windowWidth/2, 60)
 
    //display game over
    if (!gameOn) {
        text('GAME OVER', windowWidth/2, 130)
    }

    //temporary placement of level counter.
    push()
    textSize(16)
    textAlign(LEFT)
    text('Level: '+level, 5, 60)
    pop()

    //draw Limit
    drawLimit()

    //make Bar
    makeBar()

    //make Ball
    makeBall()

}