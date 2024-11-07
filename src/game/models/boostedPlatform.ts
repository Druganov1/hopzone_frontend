import { GameObject } from "./gameObject"
import p5Types from 'p5'


export class BoostedPlatform extends GameObject {

    width: number = 150

    height: number = 80

    boostedSpeed: number = 25

    show = (p5: p5Types, image: p5Types.Image) => {
        p5.imageMode(p5.CENTER)

        p5.image(image, this.x, this.y - 20, this.width, this.height)
    }
    
}