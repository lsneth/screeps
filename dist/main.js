const { mainSpawn } = require('./main.spawn')
const { setupRoomMemory } = require('./setupRoomMemory')

module.exports.loop = function () {
  // setup room memory for all rooms that don't have it, or every 1000 ticks
  for (const roomId in Game.rooms) {
    const room = Game.rooms[roomId]
    if (!room.memory.stage || Game.time % 1000 === 0) setupRoomMemory(room)
  }

  // spawn creep(s)
  mainSpawn()
}
