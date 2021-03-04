let websocket
let interval = false
let messages = []
let notifications = []
let sendTime = 700
let timer
let wsData
let wssUrl = ''
let increment = 0
let messageCount = 0
let test = true
let systemQueuedMessages = 'system.queuedMessages',
  systemWebsocketAsk = 'ack'

function decodeBinaryArray(data) {
  return new TextDecoder('utf-8').decode(data)
}

function encodeJSONToBinaryArray(json) {
  return new TextEncoder().encode(JSON.stringify(json))
}

function disconnect() {
  if (websocket) {
    websocket.close()
    websocket = null
  }
}

function connect(connectData) {
  if (connectData) {
    let wssJson = JSON.parse(decodeBinaryArray(connectData))

    wssUrl = wssJson.params.wss_url

    delete wssJson.params.wss_url

    wsData = encodeJSONToBinaryArray(wssJson)
  }

  websocket = new WebSocket(wssUrl)
  websocket.binaryType = 'arraybuffer'

  websocket.onmessage = function (event) {
    onmessage(event)
  }

  websocket.onerror = function (data) {
    if (test) console.log('ws error', data.error)

    ipcSendData('error', JSON.stringify(data.error))
  }

  websocket.onclose = function (data) {
    onclose(data)
  }

  websocket.onopen = function (data) {
    if (test) console.log('sent message auth', JSON.parse(decodeBinaryArray(wsData)))

    websocket.send(wsData)
  }
}

function sendMessage(message) {
  if (checkWebsocketState()) {
    if (test) console.log('sent message to server', decodeBinaryArray(message))

    websocket.send(message)
  }
}

function checkWebsocketState() {
  let result = false

  if (websocket) {
    switch (websocket.readyState) {
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

function wssRequest(params, method, id) {
  return { method: method, version: 1, id: id, params: params }
}

function onmessage(event) {
  let message = decodeBinaryArray(event.data)
  let wssData

  try {
    wssData = JSON.parse(message)
  } catch (e) {
    if (test) console.error('wssData parse error', e)
    return
  }

  console.log('wss data', wssData, message)

  if (!wssData.method) {
    if (test) console.error('wss method null')

    return
  }

  if (wssData.id && wssData.params) {
    let ask = wssRequest({}, systemWebsocketAsk, wssData.id)

    sendMessage(encodeJSONToBinaryArray(ask))
  }

  if (wssData.method === systemQueuedMessages) {
    if (!wssData.params) {
      if (test) console.error('systemQueuedMessages params not found')

      return
    }

    let params = wssData.params

    for (let i = 0; i < params.length; i++) {
      if (test) messageCount++

      notifications.push(params[i])
    }
  } else {
    messages.push(message)
  }

  if (!interval) {
    interval = true
    sendQueueMessages()

    setTimeout(() => {
      sendQueueMessages()
      interval = false
    }, sendTime)
  }
}

function sendQueueMessages() {
  if (notifications.length === 0 && messages.length === 0) {
    if (test) {
      console.log('total message count: ' + messageCount)
      messageCount = 0
    }

    return
  }

  if (notifications.length > 0) {
    let notification = {
      method: systemQueuedMessages,
      params: notifications,
    }

    messages.push(JSON.stringify(notification))
  }

  if (test) console.log('sent message', messages)

  console.log('message', messages)
  notifications = []
  messages = []
}

function onclose(data) {
  if (test) console.log('ws close', data)

  console('close', JSON.stringify(data))
}
