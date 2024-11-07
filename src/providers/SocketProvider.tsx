import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Socket } from 'socket.io-client'
import { GameRoom } from 'src/models/serverModels/GameRoom'
import { User } from 'src/models/serverModels/User'
import { useAuth } from './AuthProvider'

export enum SocketMessages {
  connectionFailed = 'connect_error',
  connectionSuccess = 'connect',
  activeRooms = 'b2f_gamerooms',
  lobbyInfo = 'b2f_lobby',
  joinLobby = 'f2b_joinLobby',
  leaveLobby = 'f2b_leaveLobby',
  gameState = 'b2f_gameState',
  moveLeft = 'f2b_moveLeft',
  moveRight = 'f2b_moveRight',
  stopMoving = 'f2b_stopMoving',
  gameLoading = 'b2f_gameLoading',
  getScoreboard = 'f2b_scoreboard',
  scoreboard = 'b2f_scoreboard',
  newLobby = 'f2b_newLobby',
  startGame = 'f2b_startGame',
  restartGame = 'f2b_restartGame'
}

interface ISocketContext {
  socket: Socket | undefined
  activeLobbies: GameRoom[] | undefined
  gameState: GameRoom | undefined
  scoreBoard: User[]
  connectionError: boolean
  joinLobby: (lobbyId: string) => Promise<boolean>
  leaveLobby: (lobbyId: string) => Promise<boolean>
  moveLeft: () => Promise<boolean>
  moveRight: () => Promise<boolean>
  stopMoving: () => Promise<boolean>
}

const SocketContext = createContext<ISocketContext>({} as ISocketContext)

export const useSockets = () => {
  return useContext(SocketContext)
}

export const SocketProvider: FunctionComponent = ({ children }) => {
  const { socket } = useAuth()
  const [activeLobbies, setActiveLobbies] = useState<GameRoom[]>()
  const [gameState, setGameState] = useState<GameRoom>()
  const [scoreBoard, setScoreBoard] = useState<User[]>([])
  const [connectionError, setConnectionError] = useState(false)

  useEffect(() => {
    if (socket) {
      socket.on(SocketMessages.activeRooms, (data: GameRoom[]) => {
        setActiveLobbies(data)
      })

      socket.on(SocketMessages.gameState, (data: GameRoom) => {
        setGameState(data)
      })

      socket.on(SocketMessages.scoreboard, (data: User[]) => {
        const users = data.map(u => {
          if (u.highScoreDate) u.highScoreDate = new Date(u.highScoreDate)

          return u
        })
        setScoreBoard(users)
      })

      socket.on(SocketMessages.connectionFailed, () => {
        setConnectionError(true)
      })

      socket.on(SocketMessages.connectionSuccess, () => {
        setConnectionError(false)
      })
    }
  }, [socket])

  const joinLobby = async (lobbyId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.emit(SocketMessages.joinLobby, lobbyId)
      } else {
        reject
      }
    })
  }

  const leaveLobby = (lobbyId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.emit(SocketMessages.leaveLobby, lobbyId)
        resolve(true)
      } else {
        reject(false)
      }
    })
  }

  const moveLeft = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.emit(SocketMessages.moveLeft)
        resolve(true)
      } else {
        reject(false)
      }
    })
  }
  const moveRight = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.emit(SocketMessages.moveRight)
        resolve(true)
      } else {
        reject(false)
      }
    })
  }
  const stopMoving = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.emit(SocketMessages.stopMoving)
        resolve(true)
      } else {
        reject(false)
      }
    })
  }

  const value = {
    activeLobbies: activeLobbies,
    socket,
    connectionError,
    scoreBoard,
    joinLobby,
    leaveLobby,
    gameState,
    moveLeft,
    moveRight,
    stopMoving,
  }

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}
