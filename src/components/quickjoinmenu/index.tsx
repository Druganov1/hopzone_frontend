import Link from 'next/link'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { MdArrowForward } from 'react-icons/md'
import { useAuth } from 'src/providers/AuthProvider'
import { useSockets } from 'src/providers/SocketProvider'

interface IMenuItem {
  gameId?: number
  hostname: string
  playerCount: number
}

interface MenuItemProps {
  item: IMenuItem
}

const MenuItem: FunctionComponent<MenuItemProps> = ({ item }) => {
  return (
    <li className="flex justify-between border-b-2 border-purple-600 py-2">
      <p className="text-theme-orange">{item.playerCount}/4</p>
      <span>
        {item.hostname ? item.hostname : 'Guest'}
        <Link href={`/lobby?id=${item.gameId}`}>
          <a className="text-theme-orange hover:text-orange-800">
            <MdArrowForward size={24} className="inline-block ml-2 " />
          </a>
        </Link>
      </span>
    </li>
  )
}

const QuickJoinMenu = () => {
  // const menuItems: IMenuItem[] = [
  //   { hostname: 'Alexander', playerCount: 1 },
  //   { hostname: 'Kevin', playerCount: 1 },
  // ]

  const [menuItems, setMenuItems] = useState<IMenuItem[]>([])

  const { activeLobbies } = useSockets()

  useEffect(() => {
    if (activeLobbies) {
      setMenuItems(
        activeLobbies.map(l => {
          const hostname = l.players.find(u => {
            return u.uid == l.hostId
          })?.displayName
          return {
            hostname: hostname ? hostname : 'Guest',
            playerCount: l.players.length,
            gameId: l.roomId,
          }
        }),
      )
    }
  }, [activeLobbies])

  return (
    <ul className=" overflow-scroll mb-8">
      {menuItems.length > 0 ? menuItems.map(item => {
        return <MenuItem key={item.gameId} item={item} />
      }): <p className=' text-center'>There are currently no available lobbies.</p>}
      
    </ul>
  )
}

export default QuickJoinMenu
