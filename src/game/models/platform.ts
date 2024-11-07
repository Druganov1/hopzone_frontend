import { GameObject } from './gameObject';
import p5Types from 'p5'

export class Platform extends GameObject {

    width: number = 120
    height: number = 30

    platformType: number

    constructor(xPos: number, yPos: number, platformType: number) {
        super(xPos, yPos)

        this.platformType = platformType
    }
    show(p5: p5Types, image: p5Types.Image) {
        p5.fill(255)

        // p5.rect(this.x, this.y, this.width, this.height)

        p5.imageMode(p5.CENTER)
        p5.image(image, this.x, this.y, 120, 30)
    }

    move() {
        this.x++;
    }
}