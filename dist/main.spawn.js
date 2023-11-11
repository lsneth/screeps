const { spawnCodes } = require('./utils.resultCodes')
const createRoleObject = require('./role.roles')

function customSpawnCreep({ spawn, roleName, assignmentId }) {
  const role = createRoleObject({ roleName, assignmentId, stage: spawn.room.memory.stage })
  const result = spawn.spawnCreep(role.parts, `${roleName}${Game.time.toString()}`, {
    memory: role.memory,
  })
  switch (result) {
    case OK:
      console.log('Spawn Success: ', role.name)
      break
    case ERR_NOT_ENOUGH_ENERGY:
    case ERR_BUSY:
      break

    default:
      console.log('Spawn Fail: ', spawnCodes[-result])
      break
  }

  Game.creeps.map((creep) => {
    spawn.room.memory.sources.trans
  })
}

function spawnTransporter({ spawn, assignmentId }) {
  const role = createRoleObject({ roleName: 'transporter', assignmentId, stage: spawn.room.memory.stage })
  const result = spawn.spawnCreep(role.parts, `transporter${Game.time.toString()}`, {
    memory: role.memory,
  })
  switch (result) {
    case OK:
      console.log('Spawn Success: ', role.name)
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
  Game.creeps.map((creep) => {
    switch (creep.memory.role) {
      case 'harvester':
        creep.room.memory.sources[creep.memory.assignmentId].harvester = creep.id

        break

      default:
        break
    }
  })
  // define spawn structure to spawn at
  const spawn = Game.spawns.Spawn1

  const idOfSourceWithHarvesterButNoTransporter = spawn.room.memory.sources.find(
    (source) => !!source.harvester && source.transporters.length === 0
  )
  const idOfSourceWithNoHarvester = spawn.room.memory.sources.find((source) => !source.harvester)
  const idOfSourceWithLessTransportersThanTarget = spawn.room.memory.sources.find(
    (source) => source.transporters.length < source.targetTransporterCount
  )

  // if there is a harvester without at least one transporter assigned to the same source, spawn a transporter
  if (idOfSourceWithHarvesterButNoTransporter) {
    // spawn a transporter assigned to that source
    customSpawnCreep({ spawn, roleName: 'transporter', assignmentId: idOfSourceWithHarvesterButNoTransporter })
    return
  }
  // if there is a source in the room without a harvester assigned to it, spawn a harvester
  else if (idOfSourceWithNoHarvester) {
    // spawn a harvester assigned to that source
    customSpawnCreep({ spawn, roleName: 'harvester', assignmentId: idOfSourceWithNoHarvester })
  }
  // if there is a source that has less transporters than target transporter count, spawn a transporter
  else if (idOfSourceWithLessTransportersThanTarget) {
    // spawn a transporter assigned to that source
    customSpawnCreep({ spawn, roleName: 'transporter', assignmentId: idOfSourceWithLessTransportersThanTarget })
  }
}

module.exports = mainSpawn
