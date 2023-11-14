const { spawnCodes } = require('./utils.resultCodes')

function spawnHarvester({ spawn, roomId, sourceId }) {
  const stage = spawn.room.memory.stage

  let harvesterParts
  if (stage === 1) harvesterParts = [WORK, CARRY, MOVE]
  else if (stage === 2) harvesterParts = [WORK, WORK, WORK, MOVE]
  else if (stage === 3) harvesterParts = [WORK, WORK, WORK, WORK, WORK, MOVE]

  const result = spawn.spawnCreep(harvesterParts, `harvester${Game.time.toString().slice(-5)}`, {
    memory: { role: 'harvester', roomId, sourceId },
  })
  switch (result) {
    case OK:
      console.log('Spawn Success: Harvester')
      break
    case ERR_NOT_ENOUGH_ENERGY:
    case ERR_BUSY:
      break

    default:
      console.log('Spawn Fail: ', spawnCodes[-result])
      break
  }
}

function spawnTransporter({ spawn, roomId }) {
  const stage = spawn.room.memory.stage

  let transporterParts
  if (stage === 1) transporterParts = [CARRY, MOVE]
  else if (stage === 2) transporterParts = [CARRY, CARRY, MOVE, MOVE]
  else if (stage === 3) transporterParts = [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]

  const result = spawn.spawnCreep(transporterParts, `transporter${Game.time.toString().slice(-5)}`, {
    memory: { role: 'transporter', roomId },
  })
  switch (result) {
    case OK:
      console.log('Spawn Success: Transporter')
      break
    case ERR_NOT_ENOUGH_ENERGY:
    case ERR_BUSY:
      break

    default:
      console.log('Spawn Fail: ', spawnCodes[-result])
      break
  }
}

function mainSpawn() {
  // define spawn structure to spawn at
  const spawn = Game.spawns.Spawn1

  // ids of all sources in room
  const sourceIds = spawn.room.find(FIND_SOURCES)

  // ids of sources with a harvester
  const populatedSourceIds = _.map(Game.creeps, (creep) => {
    if (creep.memory.role === 'harvester') return creep.memory.sourceId
  })

  const currentCreepCounts = _.countBy(Game.creeps, 'memory.role')

  // TODO: base this off of need, not just to match harvester count
  if ((currentCreepCounts.transporter || 0) < (currentCreepCounts.harvester || 0)) {
    spawnTransporter({ spawn, roomId: spawn.room.id })
  }
  // if there is a source in the room without a harvester assigned to it, spawn a harvester
  else if (populatedSourceIds.length < sourceIds.length) {
    for (const i = 0; i < sourceIds.length; i++) {
      const sourceId = sourceIds[i]
      // if the sourceId is not in the array of populated source ids
      if (!populatedSourceIds.includes(sourceId)) {
        // spawn a harvester assigned to that source
        spawnHarvester({ spawn, roomId: spawn.room.id, sourceId })
        break
      }
    }
  }
}

module.exports = { mainSpawn }
