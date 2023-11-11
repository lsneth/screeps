const createRoleObject = require('./role.roles')

function setupRoomMemory(room) {
  // TODO: figure out stage breakdown. room.energyCapacityAvailable can range from 300 to 12,000
  let stage
  if (room.energyCapacityAvailable < 600) stage = 1
  else if (room.energyCapacityAvailable < 900) stage = 2
  else if (room.energyCapacityAvailable < 1200) stage = 3

  // see how many CARRY parts harvesters have in the current stage and multiply it by 50
  const harvesterStoreAmount =
    createRoleObject({ roleName: 'harvester', assignmentId: 'blah', stage }).parts.filter((part) => part === CARRY)
      .length * 50

  // see how many WORK parts harvesters have in the current stage and multiply it by 2
  const harvesterHarvestPerSecondCount =
    createRoleObject({ roleName: 'harvester', assignmentId: 'blah', stage }).parts.filter((part) => part === WORK)
      .length * 2

  const spawn = room.find(FIND_MY_SPAWNS)[0]
  const sources = room.find(FIND_SOURCES)

  const sourcesData = {}
  sources.map((source) => {
    const distanceToSpawn = source.pos.findPathTo(spawn).length

    return (sourcesData[source.id] = {
      // `targetTransporterCount` is distance to spawn / ticks until harvester is full. This is because we want to transport everything the harvester harvests before it's full. For example, if there is one harvester that is 50 spaces away from the spawn, has a store size of 50, and can harvest 2 energy per tick (50 / (50 / 2) = 2), we would need 2 transporters (that travel at a speed of one space per tick) to transport the energy fast enough.
      targetTransporterCount: Math.ceil(distanceToSpawn / (harvesterStoreAmount / harvesterHarvestPerSecondCount)),
      transporters: [],
      harvester: [],
    })
  })

  room.memory = {
    stage,
    sources: sourcesData,
  }

  return room.memory
}

module.exports = setupRoomMemory
