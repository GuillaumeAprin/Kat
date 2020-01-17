module.exports = class Connection {
  constructor () {
    this.socket
    this.player
    this.character
    this.server
    this.lobby
  }

  // Handles all our io events and where we should route them too to be handled
  createEvents () {
    const connection = this
    const socket = connection.socket
    const server = connection.server
    const player = connection.player
    const character = connection.character

    socket.on('disconnect', function () {
      server.onDisconnected(connection)
    })

    socket.on('joinGame', function () {
      server.onAttemptToJoinGame(connection)
    })

    socket.on('joinPokemon', function () {
      server.onAttemptToJoinPokemon(connection)
    })

    socket.on('setBattle', function (data) {
      character.character1 = data.character1
      character.character2 = data.character2
      socket.broadcast.to(connection.lobby.id).emit('setTheBattle', character)
    })

    socket.on('switchlobby', function () {
      server.SwitchLobby(connection)
    })

    socket.on('fireBullet', function (data) {
      connection.lobby.onFireBullet(connection, data)
    })

    socket.on('collisionDestroy', function (data) {
      connection.lobby.onCollisionDestroy(connection, data)
    })

    socket.on('updatePosition', function (data) {
      player.position.x = data.position.x
      player.position.y = data.position.y

      socket.broadcast.to(connection.lobby.id).emit('updatePosition', player)
    })

    socket.on('updateRotation', function (data) {
      player.armsRotation = data.armsRotation

      socket.broadcast.to(connection.lobby.id).emit('updateRotation', player)
    })

    socket.on('setCharacter1', function (data) {
      character.character1 = data.character1
    })

    socket.on('setCharacter2', function (data) {
      character.character2 = data.character2
    })
  }
}
