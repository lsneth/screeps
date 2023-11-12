const { spawnCodes } = require('./utils.resultCodes')

function spawnHarvester({ spawn, roomId, sourceId }) {
  const stage = spawn.room.memory.stage

  let harvesterParts
  if (stage === 1) harvesterParts = [WORK, CARRY, MOVE]
  else if (stage === 2) harvesterParts = [WORK, WORK, CARRY, MOVE]
  else if (stage === 3) harvesterParts = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
  const storeCapacity = harvesterParts.filter((part) => part === CARRY).length * 50
  const workCapacity = harvesterParts.filter((part) => part === WORK).length * 2
  const distanceSpawnToSource = spawn.pos.findPathTo(Game.getObjectById(sourceId)).length
  const targetTransporterCount = Math.ceil(distanceSpawnToSource / (storeCapacity / workCapacity)) // `targetTransporterCount` is distance to spawn / ticks until harvester is full. This is because we want to transport everything the harvester harvests before it's full. For example, if there is one harvester that is 50 spaces away from the spawn, has a store size of 50, and can harvest 2 energy per tick (50 / (50 / 2) = 2), we would need 2 transporters (that travel at a speed of one space per tick) to transport the energy fast enough.

  const result = spawn.spawnCreep(harvesterParts, `harvester${Game.time.toString().slice(-5)}`, {
    memory: { role: 'harvester', roomId, sourceId, targetTransporterCount, transporters: [] },
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

function spawnTransporter({ spawn, roomId, harvesterId }) {
  const stage = spawn.room.memory.stage

  let transporterParts
  if (stage === 1) transporterParts = [CARRY, MOVE]
  else if (stage === 2) transporterParts = [CARRY, MOVE, CARRY, MOVE]
  else if (stage === 3) transporterParts = [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE]

  const result = spawn.spawnCreep(transporterParts, `transporter${Game.time.toString().slice(-5)}`, {
    memory: { role: 'transporter', roomId, harvesterId },
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

  let idsOfHarvestersWithATransporter = []
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName]
    if (creep.memory.role === 'transporter') {
      idsOfHarvestersWithATransporter.push(creep.memory.harvesterId)
    }
  }

  let idOfHarvesterWithNoTransporter
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName]
    if (creep.memory.role === 'harvester' && !idsOfHarvestersWithATransporter.includes(creep.id)) {
      idOfHarvesterWithNoTransporter = creep.id
      break
    }
  }
  let idsOfSourcesWithHarvester = []
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName]
    if (creep.memory.role === 'harvester') {
      idsOfSourcesWithHarvester.push(creep.memory.sourceId)
    }
  }

  let idOfSourceWithNoHarvester
  for (const i in spawn.room.memory.sources) {
    const sourceId = spawn.room.memory.sources[i]
    if (!idsOfSourcesWithHarvester.includes(sourceId)) {
      idOfSourceWithNoHarvester = sourceId
      break
    }
  }

  let idOfHarvesterWithLessTransportersThanTarget
  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName]
    if (creep.memory.role === 'harvester' && creep.memory.transporters.length < creep.memory.targetTransporterCount) {
      idOfHarvesterWithLessTransportersThanTarget = creep.id
      break
    }
  }

  // if there is a harvester without at least one transporter assigned to it, spawn a transporter
  if (idOfHarvesterWithNoTransporter) {
    // spawn a transporter assigned to that harvester
    spawnTransporter({ spawn, roomId: spawn.room.id, harvesterId: idOfHarvesterWithNoTransporter })
  }
  // if there is a source in the room without a harvester assigned to it, spawn a harvester
  else if (idOfSourceWithNoHarvester) {
    // spawn a harvester assigned to that source
    spawnHarvester({ spawn, roomId: spawn.room.id, sourceId: idOfSourceWithNoHarvester })
  }
  // if there is a harvester that has less transporters than target transporter count, spawn a transporter
  else if (idOfHarvesterWithLessTransportersThanTarget) {
    // spawn a transporter assigned to that source
    spawnTransporter({ spawn, roomId: spawn.room.id, harvesterId: idOfHarvesterWithLessTransportersThanTarget })
  }
}

module.exports = { mainSpawn }
