//game on?
let gameOn = true

//initialize score
let score = 0

//level up?
let level = 1

//ball parameters
let xBall = 0
let yBall = 0
let sizeBall = 10
let speedX = 2
let speedY = 7

//bar parameters
let windowHeightBar = 10
let windowWidthBar = 100
let xBar = 0

function setup() {
    createCanvas(windowWidth, windowHeight);

    //ball start
    xBall = random(sizeBall/2,windowWidth-sizeBall/2)
    yBall = sizeBall

    //score (text) parameters go here. size, position, font...
    textSize(60)
    textAlign(CENTER)
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

    //bar move
    if (mouseX < windowWidthBar/2){
        xBar = 0
    } else if (mouseX > windowWidth - windowWidthBar/2){
        xBar = windowWidth - windowWidthBar
    } else {
        xBar = mouseX - windowWidthBar/2
    }
    fill(255)
    rect(xBar, windowHeight - windowHeightBar, windowWidthBar, windowHeightBar)


    //ball movements
    //ball hits left/right wall
    if (xBall > windowWidth - sizeBall/2 || xBall < sizeBall/2 ){
        speedX = -speedX
    }
    //ball hits top wall
    if (yBall < sizeBall/2 ){
        speedY = -speedY
    }
    //ball hits the bar, yay!
    if (yBall > windowHeight - (sizeBall/2 + windowHeightBar) 
        && xBall > mouseX - windowWidthBar/2 
        && xBall < mouseX + windowWidthBar/2){
            speedY = -speedY

            //increase score and speed. but only if game is on.
            if (gameOn) {
                score ++

                //increase level after every 5 successful hits. and increase speed.
                if (score % 5 == 0) {
                    level++

                    //speed acceleration
                    speedY += speedY*0.1
                }
            }
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