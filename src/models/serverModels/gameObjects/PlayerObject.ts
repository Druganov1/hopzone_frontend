import { GameObject } from "./GameObject"

export class PlayerObject extends GameObject {

    width: number
    height: number
    xSpeed: number
    ySpeed: number
    maxSpeed: number
    movementSpeed: number
    uid: string
    displayName: string
    highestPosition: number
    playerNum: number
    isDead: boolean
    score: number
    get deathBarrierYpos() {
        return this.highestPosition + 1000
    }

    constructor(xPos: number, yPos: number, uid: string, playerNum: number, displayName: string, highestPosition?: number, isDead?: boolean, score?: number) {

        super(xPos, yPos)
        this.maxSpeed = 15
        this.playerNum = playerNum
        this.movementSpeed = 10
        this.width = 50
        this.height = 90
        this.xSpeed = 0
        this.ySpeed = 0
        this.uid = uid
        this.highestPosition = highestPosition || 0
        this.score = score || 0
        this.displayName = displayName
        this.isDead = isDead || false

    }
}