import { GameObject } from "./gameObject";
import p5Types from 'p5'

export class MovingPlatform extends GameObject {

    width: number = 150

    height: number = 45

    originXpos: number;

    movingRange: number

    xSpeed: number

    constructor(xPos: number, yPos: number, xSpeed: number) {
        super(xPos, yPos)

        this.originXpos = xPos
        this.movingRange = 40
        this.xSpeed = xSpeed
    }

    show = (p5: p5Types, image: p5Types.Image) => {
        p5.imageMode(p5.CENTER)

        p5.image(image, this.x, this.y, this.width, this.height)
    }

}