import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export default function socket(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    
    io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
        console.log('user connected')
    })
    
}