import { AccountType } from '@interfaces/user-manager'
let ws: WebSocket | null = null
type SubscriberType = (messages: any[]) => void
let subscribers = [] as any[]

function decodeBinaryArray(data: any) {
  console.log(data)
  return new TextDecoder('utf-8').decode(data)
}

function encodeJSONToBinaryArray(json: any) {
  return new TextEncoder().encode(JSON.stringify(json))
}

const closeHandler = () => {
  setTimeout(createChannel, 1000)
}

const messageHandler = (e: MessageEvent) => {
  let message = decodeBinaryArray(e.data)
  const newMessages = JSON.parse(message)

  subscribers.forEach((s) => s(newMessages))
}

const cleanUp = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.close()
}
const openHandler = () => {
  const params = {
    id: '18B0C767-A239-413F-9F92-4586E329B68B',
    method: 'client.authorization',
    params: {
      apiKey: '18F29AEC-9AD9-4FE4-9D2D-BBDE63FCD25C',
      token:
        'eyJraWQiOiIyMzAxODAwRi0wRTQyLTRDNzgtQjY1OS1DMEI4QzRFOTRBNjciLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDoyNDM5ODA5NjA1NjUyNDQ4MzAyIiwic2NwcyI6IioiLCJ2ZXIiOiIxLjAuNDQiLCJleHAiOjY0MDkyMjExMjAwLCJrZXkiOiIxOEYyOUFFQy05QUQ5LTRGRTQtOUQyRC1CQkRFNjNGQ0QyNUMiLCJkZXZuIjoiVm9sa21hbiBCb3QgU3VwZXIgRHVwZXIgMS4yLjEgc3BlY2lhbCBmb3IgTnVyaWRkaW4gMiIsInNlcyI6Ijc3RkE4NzFGLTY4OUUtNDkxQi04RDQ5LThDQ0JGRkVCRTA5NCIsInBsYXQiOiJ1bmtub3duIiwiZGV2aSI6IjQ1MTg0OGQ4LTNjZDMtNDI5Ni04MzlkLWM1NmFjMjJiNWQyYyJ9.iYgVbq0RWA45MoEel7rImoC6AK-gGleCYefD4es30XI',
    },
    version: 1,
  }

  ServiceWebsocket.sendMessage(params)
}

function createChannel() {
  cleanUp()
  ws = new WebSocket('wss://wssdev.nexustls.com/wssprox1/wss')
  ws.binaryType = 'arraybuffer'
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  //   ws.addEventListener('error', messageHandler)
}

export const ServiceWebsocket = {
  start() {
    createChannel()
  },
  stop() {
    cleanUp()
  },
  subscribe(callback: SubscriberType) {
    subscribers.push(callback)
  },
  unsubscribe(callback: SubscriberType) {
    subscribers.filter((s) => s !== callback)
  },

  sendMessage(message: any) {
    if (checkWebsocketState()) {
      console.log('sent message to server', message)
      const encodeMessage = encodeJSONToBinaryArray(message)
      ws?.send(encodeMessage)
    }
  },
}

// export const startMessageListening =()=>{

// }
// export const stopMessageListening =()=>{

// }

function checkWebsocketState() {
  let result = false

  if (ws) {
    switch (ws.readyState) {
      case WebSocket.OPEN:
        result = true
        break

      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        disconnect()
        break

      case WebSocket.CONNECTING:
        break
    }
  }

  return result
}

function disconnect() {
  if (ws) {
    ws.close()
    ws = null
  }
}
