import { GameObject } from "./GameObject";

export class MovingPlatform extends GameObject {

    width: number = 120

    height: number = 30

    originXpos: number;

    movingRange: number

    xSpeed: number

    constructor(xPos: number, yPos: number) {
        super(xPos, yPos)

        this.originXpos = xPos
        this.movingRange = 200
        this.xSpeed = 3
    }

}