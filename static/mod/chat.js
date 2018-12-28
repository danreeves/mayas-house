let ENTER = 13

export class Chat {
  constructor({ websocket, input, output, player }) {
    this.ws = websocket
    this.player = player
    this.input = document.querySelector(input)
    this.output = document.querySelector(output)
    this.send = this.send.bind(this)
    this.recieve = this.recieve.bind(this)

    chat_input.addEventListener('keypress', this.send)
    websocket.onMessage(this.recieve)
  }

  send (event) {
    if (event.keyCode == ENTER) {
      this.ws.send({ type: 'CHAT', username: this.player.username, message: event.target.value })
      event.target.value = ""
    }
  }

  recieve (event) {
    let node = document.createElement('DIV')
    node.innerHTML = `${event.username}: ${event.message}`
    node.classList.add('message')
    this.output.appendChild(node)
    node.scrollIntoView()
  }
}
