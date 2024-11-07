import { Game } from "src/models/serverModels/Game";
import { Enemy } from "src/models/serverModels/gameObjects/Enemy";
import { getRandomInt } from "./random";


export const generateEnemies = (state: Game) => {
    const highestPlayer = Math.min.apply(
        Math,
        state.players.map(function (o) {
            return o.y
        }),
    )

    const lowestPlayer = Math.max.apply(
        Math,
        state.players.map(function (o) {
            return o.y
        }),
    )

    const highestEnemy = Math.min.apply(
        Math,
        state.enemies.map(function (o) {
            return o.y
        }),
    )


    const lowestEnemy = Math.max.apply(
        Math,
        state.enemies.map(function (o) {
            return o.y
        }),
    )

    let copyOfEnemies = [...state.enemies]

    if (highestPlayer < highestEnemy + 300) {
        const newEnemy: Enemy = new Enemy(getRandomInt(-1000, 1000), getRandomInt(highestEnemy - 1000, highestEnemy - 4000), getRandomInt(3, 7))
        copyOfEnemies.push(newEnemy)
    }

    if (lowestPlayer < lowestEnemy - 1000) {
        copyOfEnemies = copyOfEnemies.filter((p: Enemy) => {
            return p.y != lowestEnemy
        })
    }

    state.enemies = copyOfEnemies

    return state
};
