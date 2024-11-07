import { GameObject } from "./GameObject";


export class Platform extends GameObject {

    width: number = 100
    height: number = 10
    platformType: number

    constructor(xPos: number, yPos: number, platformType: number){
        super(xPos, yPos)

        this.platformType = platformType
    }

}