
import { Game } from "src/models/serverModels/Game"
import { BoostedPlatform } from "src/models/serverModels/gameObjects/BoostedPlatform"
import { Enemy } from "src/models/serverModels/gameObjects/Enemy"
import { MovingPlatform } from "src/models/serverModels/gameObjects/MovingPlatform"
import { Platform } from "src/models/serverModels/gameObjects/Platform"
import { PlayerObject } from "src/models/serverModels/gameObjects/PlayerObject"
import { kill } from "./playerMovement"

export const collide = (state: Game) => {
    const updatedState = state
    const playersToKill: PlayerObject[] = []
    updatedState.players = updatedState.players.map((player) => {
        const updatedPlayer = new PlayerObject(player.x, player.y, player.uid, player.playerNum, player.displayName, player.highestPosition, player.isDead, player.score)
        updatedPlayer.ySpeed = player.ySpeed
        let collided = false
        let boostedCollision = false;
        state.platforms.map((platform) => {
            const platformObject = new Platform(platform.x, platform.y, platform.platformType)
            if (updatedPlayer.intersects(platformObject) && updatedPlayer.ySpeed > 0) {
                collided = true
            }
        })

        state.movingPlatforms.map((platform) => {
            const platformObject = new MovingPlatform(platform.x, platform.y)
            if (updatedPlayer.intersects(platformObject) && updatedPlayer.ySpeed > 0) {
                collided = true
            }
        })

        state.boostedPlatforms.map((platform) => {
            const platformObject = new BoostedPlatform(platform.x, platform.y)
            if (updatedPlayer.intersects(platformObject) && updatedPlayer.ySpeed > 0) {
                boostedCollision = true
            }
        })

        state.enemies.map((enemy) => {
            const EnemyObject = new Enemy(enemy.x, enemy.y, enemy.ySpeed)
            if (updatedPlayer.intersects(EnemyObject)) {
                playersToKill.push(updatedPlayer)
            }
        })

        if (collided) {
            updatedPlayer.ySpeed = -updatedPlayer.maxSpeed
        }

        if (boostedCollision) {
            updatedPlayer.ySpeed = -25
        }

        return updatedPlayer
    })

    if (playersToKill.length > 0) {
        updatedState.players = kill(updatedState, playersToKill).players
    }

    return updatedState
}