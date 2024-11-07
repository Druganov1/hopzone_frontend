
import { GameObject } from './gameObject';
import p5Types from 'p5'

export class Player extends GameObject {

    width: number = 50
    height: number = 90
    xSpeed: number = 0
    ySpeed: number = 0
    maxSpeed: number = 15
    movementSpeed: number = 10
    displayName: string
    uid: string
    highestPosition: number
    playerNum: number
    isDead: boolean
    score: number
    get deathBarrierYpos() {
        return this.highestPosition + 1000
    }


    constructor(xPos: number, yPos: number, uid: string, playerNum: number, displayName?: string, highestPosition?: number, xSpeed?: number, isDead?: boolean, score?: number) {
        super(xPos, yPos)
        this.highestPosition = highestPosition || 0
        this.displayName = displayName || 'Guest'
        this.uid = uid
        this.xSpeed = xSpeed || 0
        this.score = score || 0
        this.playerNum = playerNum
        this.isDead = isDead || false
    }

    show(p5: p5Types, image: p5Types.Image) {
        // p5.fill(this.color)
        // p5.rect(this.x, this.y, this.width, this.height)

        p5.imageMode(p5.CENTER)


        if (this.xSpeed >= 0) {
            p5.image(image, this.x, this.y, this.width, this.height)
        } else {
            p5.push()
            p5.scale(-1, 1)
            p5.image(image, -this.x, this.y, this.width, this.height)
            p5.pop()
        }


    }

    showBarrier(p5: p5Types) {
        p5.fill(255, 0, 0)
        p5.rect(0, this.deathBarrierYpos, 2000, 10)
    }
}