const makeCreeperBody = require('./utils.makeCreeperBody')
const { workerRoles, workerSpawnPool } = require('./role.roles')

function mainSpawn() {
  // define spawn structure to spawn at
  const spawn = Game.spawns.Spawn1
  // if the spawn isn't busy spawning
  if (!spawn.spawning) {
    // if there isn't already a creep role queued
    if (!spawn.memory.nextRole) {
      // get current creep counts
      const currentCreepCounts = _.countBy(Game.creeps, 'memory.role')
      // for each role
      for (const name in workerRoles) {
        // check to make sure we have at least minCount creeps of that role
        if ((currentCreepCounts[name] || 0) < workerRoles[name].minCount) {
          // if not, save it to memory
          spawn.memory.nextRole = name
          break
        }
      }

      // if there still isn't a creep role in memory
      if (!spawn.memory.nextRole) {
        // get a random creep role, respecting probabilities, save it to memory
        const random = Math.floor(Math.random() * workerSpawnPool.length)
        spawn.memory.nextRole = workerSpawnPool[random]
      }
    }

    // attempt to spawn the creep role in memory
    const role = workerRoles[spawn.memory.nextRole]
    const noHarvesters = _.sum(Game.creeps, (creep) => creep.memory.role === 'harvester') === 0 // in case all harvesters are dead
    // TODO: figure out a better way to do the 300 thing. It's here to counteract the -300 in utils.makeCreeperBody
    const energy = noHarvesters ? spawn.room.energyAvailable + 300 : spawn.room.energyCapacityAvailable
    const body = makeCreeperBody(energy, spawn.memory.nextRole)

    const spawnResult = spawn.spawnCreep(body, `${role.name}${Game.time.toString()}`, {
      memory: role.memory,
    })
    if (spawnResult === OK) {
      // set nextRole to undefined so it picks a new role next time
      spawn.memory.nextRole = undefined
      console.log('Spawn Success: ', role.name)
    } else if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
      // console.log('not enough energy')
    } else {
      console.log('Spawn Fail: ', spawnResult)
    }
  }
}

module.exports = mainSpawn
