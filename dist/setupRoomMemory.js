function setupRoomMemory(room) {
  // TODO: figure out stage breakdown. room.energyCapacityAvailable can range from 300 to 12,000
  let stage
  if (room.energyCapacityAvailable < 600) stage = 1
  else if (room.energyCapacityAvailable < 900) stage = 2
  else if (room.energyCapacityAvailable < 1200) stage = 3

  // the containers the harvesters store energy in, there should eventually be 1 per source
  const sourceContainerIds = []
  for (const source of room.find(FIND_SOURCES)) {
    const containers = room.find(FIND_STRUCTURES, {
      filter: (structure) => structure.structureType === STRUCTURE_CONTAINER,
    })

    for (const container of containers) {
      if (container.pos.isNearTo(source)) {
        sourceContainerIds.push(container.id)
        break // exit the inner loop once a matching container is found
      }
    }

    sourceContainerIds.push(null)
  }

  room.memory = {
    stage,
    sourceContainerIds,
  }
}

module.exports = { setupRoomMemory }
