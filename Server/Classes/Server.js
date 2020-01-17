const Connection = require('./Connection')
const Player = require('./Player')
const Character = require('./Character')

// Lobbies
const LobbyBase = require('./Lobbies/LobbyBase')
const GameLobby = require('./Lobbies/GameLobby')
const GameLobbySettings = require('./Lobbies/GameLobbySettings')

module.exports = class Server {
  constructor () {
    this.connections = []
    this.lobbys = []

    this.lobbys[0] = new LobbyBase(0)
  }

  // Interval update every 100 miliseconds
  onUpdate () {
    const server = this

    // Update each lobby
    for (const id in server.lobbys) {
      server.lobbys[id].onUpdate()
    }
  }

  // Handle a new connection to the server
  onConnected (socket) {
    const server = this
    const connection = new Connection()
    connection.socket = socket
    connection.player = new Player()
    connection.character = new Character()
    connection.server = server

    const player = connection.player
    const lobbys = server.lobbys

    console.log('Added new player to the server (' + player.id + ')')
    server.connections[player.id] = connection

    socket.join(player.lobby)
    connection.lobby = lobbys[player.lobby]
    connection.lobby.onEnterLobby(connection)

    return connection
  }

  onDisconnected (connection = Connection) {
    const server = this
    const id = connection.player.id

    delete server.connections[id]
    console.log('Player ' + connection.player.displayerPlayerInformation() + ' has disconnected')

    // Tell Other players currently in the lobby that we have disconnected from the game
    connection.socket.broadcast.to(connection.player.lobby).emit('disconnected', {
      id: id
    })

    // Preform lobby clean up
    server.lobbys[connection.player.lobby].onLeaveLobby(connection)
  }

  onAttemptToJoinGame (connection = Connection) {
    // Look through lobbies for a gamelobby
    // check if joinable
    // if not make a new game
    const server = this
    let lobbyFound = false

    const gameLobbies = server.lobbys.filter(item => {
      return item instanceof GameLobby
    })
    console.log('Found (' + gameLobbies.length + ') lobbies on the server')

    gameLobbies.forEach(lobby => {
      if (!lobbyFound) {
        const canJoin = lobby.canEnterLobby(connection)

        if (canJoin) {
          lobbyFound = true
          server.onSwitchLobby(connection, lobby.id)
        }
      }
    })

    // All game lobbies full or we have never created one
    if (!lobbyFound) {
      console.log('Making a new game lobby')
      const gamelobby = new GameLobby(gameLobbies.length + 1, new GameLobbySettings('FFA', 10))
      server.lobbys.push(gamelobby)
      server.onSwitchLobby(connection, gamelobby.id)
    }
  }

  onAttemptToJoinPokemon (connection = Connection) {
    // Look through lobbies for a gamelobby
    // check if joinable
    // if not make a new game
    const server = this
    let lobbyFound = false
    connection.character.active = true

    const gameLobbies = server.lobbys.filter(item => {
      return item instanceof GameLobby
    })
    console.log('Found (' + gameLobbies.length + ') lobbies on the server')

    gameLobbies.forEach(lobby => {
      if (!lobbyFound) {
        const canJoin = lobby.canEnterLobby(connection)

        if (canJoin) {
          lobbyFound = true
          server.onSwitchLobby(connection, lobby.id)
        }
      }
    })

    // All game lobbies full or we have never created one
    if (!lobbyFound) {
      console.log('Making a new game lobby')
      const gamelobby = new GameLobby(gameLobbies.length + 1, new GameLobbySettings('FFA', 2))
      server.lobbys.push(gamelobby)
      server.onSwitchLobby(connection, gamelobby.id)
    }
  }

  SwitchLobby (connection = Connection) {
    const server = this

    const gameLobbies = server.lobbys.filter(item => {
      return item instanceof GameLobby
    })
    console.log('Making a new game lobby')
    const gamelobby = new GameLobby(gameLobbies.length + 1, new GameLobbySettings('FFA', 2))
    server.lobbys.push(gamelobby)
    server.onSwitchLobby(connection, gamelobby.id)
  }

  onSwitchLobby (connection = Connection, lobbyID) {
    const server = this
    const lobbys = server.lobbys

    connection.socket.join(lobbyID) // Join the new lobby's socket channel
    connection.lobby = lobbys[lobbyID]// assign reference to the new lobby

    lobbys[connection.player.lobby].onLeaveLobby(connection)
    lobbys[lobbyID].onEnterLobby(connection)
  }
}
