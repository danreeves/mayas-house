
export class WS {
  constructor(url) {
    this.ws = new WebSocket(url)
    this.onMessageCallbacks = []
    this.onMessage = this.onMessage.bind(this)
    this.send = this.send.bind(this)

    this.ws.onmessage = (event) => {
      let data = JSON.parse(event.data)
      this.onMessageCallbacks.forEach(callback => {
        callback(data)
      })
    }
  }

  onMessage (callback) {
    this.onMessageCallbacks.push(callback)
  }

  send(data) {
    this.ws.send(JSON.stringify(data))
  }
}
