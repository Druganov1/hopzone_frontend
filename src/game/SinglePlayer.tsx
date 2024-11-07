
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from 'src/components/forms/Button'
import GameOver from 'src/components/gameOver/GameOver'
import PageTitle from 'src/components/text/PageTitle'
import { useGameState } from './providers/gameStateProvider'
import TestMultiplayer from './testMultiplayer'

const SinglePlayer = () => {
  const router = useRouter()
  const { state, moveLeft, moveRight, stopMoving, createGame } = useGameState()

  const [hasStarted, setHasStarted] = useState(true)

  const handleContinueClick = () => {
    router.push('/')
  }

  useEffect(() => {
    createGame()
  }, [])

  useEffect(() => {
    if (state?.deadPlayers == 1) {
      setHasStarted(false)
    }
  }, [state])

  return (
    <div>
      {state && hasStarted ? (
        <TestMultiplayer
          gameState={state}
          moveLeft={moveLeft}
          moveRight={moveRight}
          stopMoving={stopMoving}
          isSinglePlayer={true}
        />
      ) : (
        <div>
          <GameOver players={state?.players}></GameOver>
          <div className="flex justify-center">
            <Button onClick={handleContinueClick} className=" max-w-md mx-auto">
              CONTINUE
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SinglePlayer
