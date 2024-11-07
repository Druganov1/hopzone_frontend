import { GameObject } from "./GameObject";

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
}