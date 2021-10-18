class Brick {
    constructor(posX, posY, tW, tH, color) {
        this.x = posX
        this.y = posY
        this.w = tW
        this.h = tH
        this.col = {r: color.r, g: color.g, b: color.b}
    }

    drawBrick() {
        push()
        stroke(255)

        // console.log(this.x,this.y,this.w,this.h)
        fill(this.col.r, this.col.g, this.col.b, 255)
        rect(this.x,this.y,this.w,this.h)
        pop()
    }
}


class Ball {
    constructor(posX,posY,d) {
        this.x = posX
        this.y = posY
        this.d = d
        this.r = d/2
    }

    moveBall() {
        
    }
}
