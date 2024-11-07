import { Platform } from "src/models/serverModels/gameObjects/Platform"
import { getRandomInt } from "./random"

const amountOfPlaforms = 30

export const generateLevel = (): Platform[] => {
    const platforms: Platform[] = []
    let prevPlatform: Platform = new Platform(-50000, 200, 0)
    for (let i = 0; i < amountOfPlaforms; i++) {

        let platform = new Platform(getRandomInt(-1000, 1000), getRandomInt(-200, -1000), getRandomInt(0, 3))

        platforms.map((p) => {
            while (platform.intersects(p)) {
                platform = new Platform(getRandomInt(-1000, 1000), getRandomInt(-200, -1000), getRandomInt(0, 3))
            }
        })
        prevPlatform = platform
        platforms.push(platform)
    }

    return platforms
}