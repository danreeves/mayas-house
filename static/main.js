import {WS} from './mod/ws.js'
import {Chat} from './mod/chat.js'
import {Game} from './mod/game.js'
import {Player} from './mod/player.js'

let username
while (!username) {
  username = window.prompt('Pick a username:')
}

let player = new Player({ username, current: true })

let websocket = new WS(`ws://${document.location.hostname}:3000`)

let chat = new Chat({
  input: '#chat_input',
  output: '#chat_output',
  websocket,
  player
})

let game = new Game({
  canvas: '#canvas',
  player,
  websocket
})
