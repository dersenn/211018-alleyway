//game on?
let gameOn = true

//ball parameters
let xBall = 0
let yBall = 0
let sizeBall = 20
let speedX = 2
let speedY = 7

//bar parameters
let heightBar = 10
let widthBar = 100
let xBar

//initialize score
let score = 0

//level up?
let level = 1

//yLimit for increased difficulty (limit playground)
let yLimitTop = 0
let yLimitBottom

//bricks
let brickRows = 1
let brickCols = 3
let theBricks = []


function setup() {
    createCanvas(windowWidth, windowHeight);

    yLimitBottom = windowHeight - heightBar

    createBricks()
    console.log(theBricks)

    // bar start
    xBar = windowWidth/2 - widthBar/2

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

    //draw Limit
    drawLimit()

    //make Bar
    drawBar()

    //make Ball
    drawBall()

    //draq Bricks
    // drawBricks()

}