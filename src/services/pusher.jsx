import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: "us2",
    useTLS: true
})

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    {
        cluster: "us2"
    }
)

// Datos de prueba
export const pusherServer2 = new PusherServer({
    appId: process.env.PUSHER_APP_ID2,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY2,
    secret: process.env.PUSHER_APP_SECRET2,
    cluster: "us2",
    useTLS: true
})

export const pusherClient2 = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY2,
    {
        cluster: "us2"
    }
)