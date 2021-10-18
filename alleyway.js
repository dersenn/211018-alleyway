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
    xBall = Math.floor(Math.random() * windowWidth) + sizeBall;
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
    //idea: we could use the same thing to display some 'LEVEL UP' stuff.

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

    //speed acceleration
    //idea: maybe we could increase the speed on each successful hit? Not on frameCount.
    //or maybe some levels. i added the vars already, but didn't implement it here yet.
    //we should figure out the speed thing first! >> Yes good idea!

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
            //increase score. but only if game is on.
            if (gameOn) {
                score ++
            }
            //increase level after every 5 or so successful hits. We can use this for the speed increase.
            //put in 2 now, because of our speed problem. to test.
            if (score % 4 == 0) {
                if (gameOn) {
                    level++
                }
                //speed up > only 6 levels
                if (level<7){
                    speedY += speedY*0.1
                }
            }
    }

    //i think the problem with the 'fail' at high speed has something to do with the step/speed-size.
    //i can't quite figure it out. but we somehow need to check collision in advance...
    //or add some buffer, to account for bar height and speed... I dont know why but now it roks for me!!

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