import { GameObject } from "./gameObject";

import p5Types from 'p5'


export class Enemy extends GameObject {

    width: number = 75

    height: number = 254.25

    originXpos: number;

    movingRange: number

    ySpeed: number

    constructor(xPos: number, yPos: number, ySpeed: number) {
        super(xPos, yPos)

        this.originXpos = xPos
        this.movingRange = 400
        this.ySpeed = ySpeed
    }

    show = (p5: p5Types, image: p5Types.Image) => {
        // p5.fill(0, 0, 255)

        // p5.rect(this.x, this.y, this.width, this.height)

        p5.imageMode(p5.CENTER)

        p5.image(image, this.x, this.y, this.width, this.height)
    };


}