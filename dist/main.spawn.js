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

  // all sources in room
  const sources = spawn.room.find(FIND_SOURCES)

  // ids of sources with a harvester
  const populatedSourceIds = _.map(Game.creeps, (creep) => {
    if (creep.memory.role === 'harvester') return creep.memory.sourceId
  })

  const currentRoleCounts = _.countBy(Game.creeps, 'memory.role')

  // if there are less transporters than harvesters // TODO: base this off of need, not just to match harvester count
  if ((currentRoleCounts.transporter || 0) < (currentRoleCounts.harvester || 0)) {
    spawnTransporter({ spawn, roomId: spawn.room.id })
  }
  // if there is a source in the room without a harvester assigned to it, spawn a harvester
  else if (populatedSourceIds.length < spawn.room.find(FIND_SOURCES).length) {
    for (const source of sources) {
      // if the id of source is not in the array of populated source ids
      if (!populatedSourceIds.includes(source.id)) {
        // spawn a harvester assigned to that source
        spawnHarvester({ spawn, roomId: spawn.room.id, sourceId: source.id })
        break
      }
    }
  }
}

module.exports = { mainSpawn }
