import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdArrowForward, MdPerson } from 'react-icons/md'
import Card from 'src/components/card'
import Button from 'src/components/forms/Button'
import PageLayout from 'src/components/layout'
import QuickJoinMenu from 'src/components/quickjoinmenu'
import PageTitle from 'src/components/text/PageTitle'
import SubTitle from 'src/components/text/SubTitle'
import { Authenticated, useAuth } from 'src/providers/AuthProvider'
import { SocketMessages, useSockets } from 'src/providers/SocketProvider'
import { GameRoom } from 'src/models/serverModels/GameRoom'
import ConnectionError from 'src/components/errors/ConnectionError'
import { User } from 'src/models/serverModels/User'

const Home: NextPage = () => {
  const router = useRouter()

  const { socket, user } = useAuth()
  const { connectionError, scoreBoard } = useSockets()

  const handleCreatLobbyClick = () => {
    socket?.emit(SocketMessages.newLobby)
  }
  const handleSingleplayerClick = () => {
    router.push('/gamesession')
  }

  const handleJoinLobby = (data: GameRoom) => {
    router.push(`/lobby?id=${data.roomId}`)
  }

  useEffect(() => {
    let mounted = true
    if (socket && mounted) {
      socket.emit(SocketMessages.getScoreboard)
      socket.on(SocketMessages.lobbyInfo, handleJoinLobby)
    }

    return () => {
      mounted = false
      // socket?.disconnect()
      socket?.off(SocketMessages.lobbyInfo, handleJoinLobby)
    }
  }, [socket])

  return (
    <PageLayout>
      <Authenticated>
        <PageTitle className="text-center ">BirbieUp</PageTitle>
        <Card className="grid-cols-2 mb-8 md:grid">
          <div className="flex flex-col justify-between max-w-xs p-8 mx-auto">
            <SubTitle className="text-center">Single Player</SubTitle>
            <Button
              onClick={handleSingleplayerClick}
              className="flex justify-center"
            >
              <MdArrowForward size={20} />
            </Button>
          </div>
          <div className="p-8 bg-purple-700 rounded-bl-lg rounded-br-lg md:rounded-bl-none md:rounded-tr-lg">
            {connectionError ? (
              <div className="flex flex-col items-center ">
                <SubTitle className="text-center">Quick Join</SubTitle>
                <ConnectionError />
              </div>
            ) : (
              <div className="flex flex-col justify-between max-w-md min-h-full mx-auto max-h-96">
                <SubTitle className="text-center">Quick Join</SubTitle>
                <QuickJoinMenu />
                <Button onClick={handleCreatLobbyClick}>CREATE NEW</Button>
              </div>
            )}
          </div>
        </Card>
        <h2 className="mb-4 text-3xl font-semibold text-theme-orange">
          Top players
        </h2>
        <div className="grid-cols-2 md:grid gap-x-2">
          {scoreBoard.map(p => {
            return (
              <Card
                key={p.uid}
                className={` p-5 flex justify-between items-center text-2xl  mb-2`}
              >
                <div className="flex items-center gap-2">
                  <MdPerson size={24} />
                  <span>
                    {p.displayName + ' '}
                    {user?.uid == p.uid ? <span>(You)</span> : null}
                  </span>
                </div>
                <div>
                  <p className="text-right text-orange-700 ">{p.highScore}m</p>
                  <p className="text-sm text-purple-400 ">
                    {p.highScoreDate?.toLocaleString('en-us', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </Authenticated>
    </PageLayout>
  )
}

export default Home
