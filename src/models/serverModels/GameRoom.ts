import { Game } from "./Game";
import { User } from "./User";


export interface GameRoom {
    roomId: number
    game: Game | undefined
    hostId: string
    players: User[]
    hasStarted: boolean
    hasEnded: boolean
}

