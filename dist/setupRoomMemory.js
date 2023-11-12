function setupRoomMemory(room) {
  // TODO: figure out stage breakdown. room.energyCapacityAvailable can range from 300 to 12,000
  let stage
  if (room.energyCapacityAvailable < 600) stage = 1
  else if (room.energyCapacityAvailable < 900) stage = 2
  else if (room.energyCapacityAvailable < 1200) stage = 3

  room.memory = {
    stage,
    sources: room.find(FIND_SOURCES).map((source) => source.id),
  }
}

module.exports = { setupRoomMemory }
