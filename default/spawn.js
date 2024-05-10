const { spawnCodes } = require('./utils.resultCodes')

function mainSpawn() {
  const spawn = Game.spawns.Spawn1

  const result = spawn.spawnCreep([WORK, CARRY, MOVE], `harvester${Game.time.toString()}`, {
    memory: { role: 'harvester' },
  })
  switch (result) {
    case OK:
      console.log('Spawn Success: ', 'harvester')
      break
    case ERR_NOT_ENOUGH_ENERGY:
    case ERR_BUSY:
      break

    default:
      console.log('Spawn Fail: ', spawnCodes[-result])
      break
  }
}

module.exports = mainSpawn
