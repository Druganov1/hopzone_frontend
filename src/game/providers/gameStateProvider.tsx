import { platform } from 'os'
import React, {
  Children,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Game } from 'src/models/serverModels/Game'
import { BoostedPlatform } from 'src/models/serverModels/gameObjects/BoostedPlatform'
import { Enemy } from 'src/models/serverModels/gameObjects/Enemy'
import { MovingPlatform } from 'src/models/serverModels/gameObjects/MovingPlatform'
import { Platform } from 'src/models/serverModels/gameObjects/Platform'
import { PlayerObject } from 'src/models/serverModels/gameObjects/PlayerObject'
import { useAuth } from 'src/providers/AuthProvider'
import { collide } from '../utils/collision'
import { generateEnemies } from '../utils/enemyGeneration'
import { moveEnemies } from '../utils/enemyMovement'
import { generateLevel } from '../utils/levelGeneration'
import {
  generateBoostedPlatforms,
  generateMovingPlatforms,
  generatePlatforms,
} from '../utils/platformGeneration'
import { movePlatforms } from '../utils/platformMovement'
import { EPlayerMovements, gravity, move } from '../utils/playerMovement'
import { getRandomInt } from '../utils/random'

interface IPlayerMovement {
  uid: string
  movement: EPlayerMovements
}

interface IGameStateContext {
  state: Game | undefined
  updateGameState: () => void
  createGame: () => void
  moveLeft: () => void
  moveRight: () => void
  stopMoving: () => void
}

const GameStateContext = createContext<IGameStateContext>(
  {} as IGameStateContext,
)

export function useGameState() {
  return useContext(GameStateContext)
}

const GameStateProvider: FunctionComponent = ({ children }) => {
  const { user } = useAuth()
  const [gameState, setGameState] = useState<Game>()
  const [playerMovements, setPlayerMovements] = useState<IPlayerMovement[]>([])

  const createGame = () => {
    const platforms = generateLevel()

    const players = [
      new PlayerObject(
        0,
        -50,
        user?.uid || 'uid',
        0,
        user?.displayName || 'Guest',
      ),
    ]

    platforms.push(new Platform(players[0].x, 0, getRandomInt(0, 3)))

    const movingPlatforms = [
      new MovingPlatform(getRandomInt(-1000, 1000), getRandomInt(0, -500)),
    ]
    const boostedPlatforms = [
      new BoostedPlatform(getRandomInt(-1000, 1000), getRandomInt(0, -500)),
    ]
    const enemies = [
      new Enemy(
        getRandomInt(-1000, 1000),
        getRandomInt(-1000, -2000),
        getRandomInt(3, 7),
      ),
    ]

    const game: Game = {
      players: players,
      alivePlayers: players.length,
      deadPlayers: 0,
      platforms: platforms,
      movingPlatforms: movingPlatforms,
      boostedPlatforms: boostedPlatforms,
      enemies: enemies,
    }

    setGameState(game)
  }

  const updateGameState = () => {
    let oldState = { ...gameState } as Game

    if (oldState.alivePlayers == 0) {
    } else {
      oldState = gravity(oldState)
      oldState = movePlatforms(oldState)
      oldState = moveEnemies(oldState)
      oldState = collide(oldState)
      playerMovements.map(p => {
        
        oldState = move(oldState, p.uid, p.movement)
      })

      oldState = generatePlatforms(oldState)
      oldState = generateMovingPlatforms(oldState)
      oldState = generateBoostedPlatforms(oldState)
      oldState = generateEnemies(oldState)

      setGameState(oldState as Game)
    }
  }

  const moveLeft = () => {
    const p = playerMovements.find(p => {
      p.uid == user?.uid
    })

    if (p) {
      const index = playerMovements.indexOf(p)
      p.movement = EPlayerMovements.left
      playerMovements[index] = p
      setPlayerMovements(playerMovements)
    } else {
      setPlayerMovements([{ uid: user!.uid, movement: EPlayerMovements.left }])
    }
  }
  const moveRight = () => {
    const p = playerMovements.find(p => {
      p.uid == user?.uid
    })

    if (p) {
      const index = playerMovements.indexOf(p)
      p.movement = EPlayerMovements.right
      playerMovements[index] = p
      setPlayerMovements(playerMovements)
    } else {
      setPlayerMovements([{ uid: user!.uid, movement: EPlayerMovements.right }])
    }
  }
  const stopMoving = () => {
    const p = playerMovements.find(p => {
      p.uid == user?.uid
    })

    if (p) {
      const index = playerMovements.indexOf(p)
      p.movement = EPlayerMovements.stop
      playerMovements[index] = p
      setPlayerMovements(playerMovements)
    } else {
      setPlayerMovements([{ uid: user!.uid, movement: EPlayerMovements.stop }])
    }
  }

  const value = {
    state: gameState,
    updateGameState,
    createGame,
    moveLeft,
    moveRight,
    stopMoving,
  }
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export default GameStateProvider
