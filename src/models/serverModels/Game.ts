import { BoostedPlatform } from "./gameObjects/BoostedPlatform";
import { Enemy } from "./gameObjects/Enemy";
import { MovingPlatform } from "./gameObjects/MovingPlatform";
import { Platform } from "./gameObjects/Platform";
import { PlayerObject } from "./gameObjects/PlayerObject";

export interface Game {
    players: PlayerObject[]
    platforms: Platform[]
    movingPlatforms: MovingPlatform[]
    boostedPlatforms: BoostedPlatform[]
    enemies: Enemy[]
    alivePlayers: number
    deadPlayers: number
}