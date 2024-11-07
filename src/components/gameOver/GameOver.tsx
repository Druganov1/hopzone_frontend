import Image from 'next/image'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { PlayerObject } from 'src/models/serverModels/gameObjects/PlayerObject'
import PageTitle from '../text/PageTitle'
import SubTitle from '../text/SubTitle'

interface GameOverProps {
  players: PlayerObject[] | undefined
}

const GameOver: FunctionComponent<GameOverProps> = ({ players }) => {
  const [sortedPlayers, setsortedPlayers] = useState<PlayerObject[]>()
  const [images, setimages] = useState<string[]>([]);
  const [colcount, setcolcount] = useState(1)

  const sortPlayers = (unsorted: PlayerObject[]) => {
    const sorted = unsorted.sort((a, b) => {
      const score1 = a.score
      const score2 = b.score

      if (score1 < score2) {
        return 1
      }
      if (score1 > score2) {
        return -1
      }
      return 0
    })

    if (sorted.length > 2) {
      setcolcount(sorted.length - 1)
    }

    return sorted
  }

  useEffect(() => {
    if (players) {
      setsortedPlayers(sortPlayers(players))
    }
  }, [players])

  useEffect(() => {
    const orangeHead = '/img/head_orange@4x.png'
    const prupleHead = '/img/head_purple@4x.png'
    const greenHead = '/img/head_green@4x.png'
    const blueHead = '/img/head_blue@4x.png'

    setimages([orangeHead, prupleHead, greenHead, blueHead])
  }, []);
  

  return (
    <div className=" mb-16">
      <PageTitle>Game Over</PageTitle>
      <SubTitle>Everyone fell into the void...</SubTitle>
      <div className={`grid gap-6 ${colcount == 1 ? ' grid-cols-1': colcount == 2 ? 'grid-cols-2': colcount == 3 ? ' grid-cols-3': ''}`}>
        {sortedPlayers?.map((p, i) => {
          if (i == 0) {
            return (
              <div key={p.uid} className={colcount == 1 ? ' col-span-1': colcount == 2 ? 'col-span-2': colcount == 3 ? ' col-span-3': ''}>
                <div className="flex justify-center mb-4">
                  <Image
                    src={images[p.playerNum]}
                    width={166}
                    height={148}
                  />
                </div>
                <h1 className=" text-center text-2xl text-purple-500">#1 {p.displayName}</h1>
                <p className=" text-center text-3xl">
                  {p.score}
                </p>
              </div>
            )
          }
          return (
            <div key={p.uid} className={''}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Image src={images[p.playerNum]} width={83} height={74} />
                <div>
                  <h1 className=" text-xl text-purple-500">
                    #{i + 1} {p.displayName}
                  </h1>
                  <p className=" text-2xl">
                    {p.score}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GameOver
