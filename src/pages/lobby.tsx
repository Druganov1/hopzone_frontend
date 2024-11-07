import { GetServerSideProps, NextPage } from 'next'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from 'src/components/forms/Button'
import GameOver from 'src/components/gameOver/GameOver'
import PageLayout from 'src/components/layout'
import LobbyPlayers from 'src/components/lobby/LobbyPlayers'
import PageTitle from 'src/components/text/PageTitle'
import TestMultiplayer from 'src/game/testMultiplayer'
import { User } from 'src/models/serverModels/User'
import { useAuth } from 'src/providers/AuthProvider'
import { SocketMessages, useSockets } from 'src/providers/SocketProvider'
import { copyToClipboard } from 'src/utils/copyToClipboard'

interface Props {
  host: string | null
}

const Lobby: NextPage<Props> = ({ host }) => {
  const router = useRouter()

  const [gameLoading, setGameLoading] = useState(false)
  const { socket, user } = useAuth()
  const { leaveLobby } = useSockets()
  const { joinLobby, gameState, moveLeft, moveRight, stopMoving } = useSockets()
  const [hostId, setHostId] = useState('')
  const [players, setPlayers] = useState<User[]>([])
  const [copied, setCopied] = useState(false)

  const handleStartGameClick = () => {
    if (socket) {
      socket.emit(SocketMessages.startGame, router.query.id as string)
    }
  }

  const handleContinueClick = () => {
    if (socket) {
      socket.emit(SocketMessages.restartGame, router.query.id as string)
    }
  }

  const handleCopyToClipboard = () => {
    copyToClipboard(`${host}${router.asPath}`).then(() => {
      setCopied(true)
    })
  }

  useEffect(() => {
    if (router.query.id && socket) {
      joinLobby(router.query.id as string)

      socket.on(SocketMessages.gameLoading, () => {
        setGameLoading(true)
      })
    }
  }, [socket])

  useEffect(() => {
    if (gameState) {
      setHostId(gameState.hostId)
      const players = gameState.players.map(p => {
        return {
          displayName: p.displayName ? p.displayName : 'Guest',
          uid: p.uid,
        }
      })
      setPlayers(players)
      setGameLoading(false)
    }
  }, [gameState])

  useEffect(() => {
    const routeChangeStart = (url: string) => {
      leaveLobby(router.query.id as string)
    }

    const beforeunload = (e: {
      preventDefault: () => void
      returnValue: string
    }) => {
      leaveLobby(router.query.id as string)
    }

    if (router.query.id && socket) {
      window.addEventListener('beforeunload', beforeunload)
      Router.events.on('routeChangeStart', routeChangeStart)
    }

    return () => {
      window.removeEventListener('beforeunload', beforeunload)
      Router.events.off('routeChangeStart', routeChangeStart)
    }
  }, [router.query.id, socket])

  return (
    <PageLayout>
      {!gameState?.hasStarted ? (
        !gameState?.hasEnded ? (
          <div className="flex flex-col justify-between h-full gap-8">
            <div className="grid gap-8">
              <PageTitle>Lobby</PageTitle>
              <div>
                <h2 className=" text-3xl text-theme-orange font-semibold mb-4">
                  Invite your friends!
                </h2>
                <p className="mb-4">
                  Use this invite link to invite your friends to the lobby!
                </p>
                <div className="flex items-center gap-2">
                  <div className="bg-purple-200 rounded-sm">
                    <span className=" text-purple-700 p-2">
                      {host}
                      {router.asPath}
                    </span>
                    <button
                      onClick={handleCopyToClipboard}
                      className=" bg-purple-500 p-2 text-purple-900 rounded-sm hover:bg-purple-600"
                    >
                      Copy Link
                    </button>
                  </div>
                  {copied ? <p className=" text-purple-600">Copied!</p> : null}
                </div>
              </div>

              <LobbyPlayers players={players} hostId={hostId} />
            </div>
            {!gameLoading ? (
              hostId == user?.uid ? (
                <Button
                  onClick={handleStartGameClick}
                  className=" max-w-md mx-auto"
                >
                  START GAME
                </Button>
              ) : (
                <Button
                  disabled
                  onClick={handleStartGameClick}
                  className=" max-w-md mx-auto"
                >
                  Waiting for host...
                </Button>
              )
            ) : (
              <h1 className=" text-center text-orange-400 text-2xl">
                Starting game...
              </h1>
            )}
          </div>
        ) : (
          <>
            <GameOver players={gameState.game?.players} />
            <div className="flex justify-center">
              {hostId == user?.uid ? (
                <Button
                  onClick={handleContinueClick}
                  className=" max-w-md mx-auto"
                >
                  CONTINUE
                </Button>
              ) : (
                <Button
                  disabled
                  onClick={handleStartGameClick}
                  className=" max-w-md mx-auto"
                >
                  Waiting for host...
                </Button>
              )}
            </div>
          </>
        )
      ) : (
        <TestMultiplayer
          gameState={gameState.game!}
          moveLeft={moveLeft}
          moveRight={moveRight}
          stopMoving={stopMoving}
        />
      )}
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => ({
  props: { host: context.req.headers.host || null },
})

export default Lobby
