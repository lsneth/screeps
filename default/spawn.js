const { spawnCodes } = require('./utils.resultCodes')

function getNextSpawnRole() {
  const harvesterCount = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester').length
  const carrierCount = _.filter(Game.creeps, (creep) => creep.memory.role === 'carrier').length

  if (harvesterCount === 0) return 'harvester'
  if (harvesterCount <= carrierCount) return 'harvester'
  return 'carrier'
}

function spawnCreeps() {
  const spawn = Game.spawns.Spawn1
  const role = getNextSpawnRole()

  const result = spawn.spawnCreep([WORK, CARRY, MOVE], `${role}${Game.time.toString()}`, {
    memory: { role },
  })
  switch (result) {
    case OK:
      console.log('Spawn Success: ', role)
      break
    case ERR_NOT_ENOUGH_ENERGY:
    case ERR_BUSY:
      break

    default:
      console.log('Spawn Fail: ', spawnCodes[-result])
      break
  }
}

module.exports = spawnCreeps
