import React, { FunctionComponent } from 'react'
import { MdPerson } from 'react-icons/md'
import { User } from 'src/models/serverModels/User'
import { useAuth } from 'src/providers/AuthProvider'
import Card from '../card'

interface LobbyPlayerProps {
  players: User[]
  hostId: string
}

const LobbyPlayers: FunctionComponent<LobbyPlayerProps> = ({
  players,
  hostId,
}) => {
  const { user } = useAuth()

  return (
    <div>
      <h2 className=" text-3xl text-theme-orange font-semibold mb-8">
        Players waiting ({players.length}/4)
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {players.map(p => {
          return (
            <Card
              key={p.uid}
              className={` p-5 flex justify-between items-center text-2xl ${
                p.uid == hostId ? 'text-orange-800' : ''
              } `}
            >
              <p>
                {p.displayName + ' '}
                {user?.uid == p.uid ? <span>(You)</span> : null}
              </p>
              <MdPerson size={24} />
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default LobbyPlayers
