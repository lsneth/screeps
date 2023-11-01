const makeCreeperBody = require('./utils.makeCreeperBody')
const { workerRoles, workerSpawnPool } = require('./role.roles')

function mainSpawn() {
  // define spawn structure to spawn at
  const spawn = Game.spawns.Spawn1

  // if max harvester count isn't already saved to room memory
  if (!spawn.room.memory.maxRoleCounts) {
    spawn.room.memory.maxRoleCounts = {} // TODO: make this section build itself from the very start
    spawn.room.memory.maxRoleCounts.harvester = 0

    // map through all sources
    spawn.room.find(FIND_SOURCES).map((source) => {
      // get 3x3 grid of squares around source
      const area = spawn.room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1)
      // count how many of them are wall terrain
      let count = 0
      for (const y in area) {
        for (const x in area[y]) {
          area[y][x].map((element) => {
            if (element.type === 'terrain' && element.terrain === 'wall') {
              count += 1
            }
          })
        }
      }
      // add to current maxHarvesterCount: 9 total squares minus the wall count to get the available count
      spawn.room.memory.maxRoleCounts.harvester += 9 - count
    })
  }

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
    const energy = noHarvesters ? spawn.room.energyAvailable : spawn.room.energyCapacityAvailable
    const body = makeCreeperBody(energy, spawn.memory.nextRole)

    const spawnResult = spawn.spawnCreep(body, `${role.name}${Game.time.toString()}`, {
      memory: role.memory,
    })

    switch (spawnResult) {
      case OK:
        // set nextRole to undefined so it picks a new role next time
        spawn.memory.nextRole = undefined
        console.log('Spawn Success: ', role.name)
        break
      case ERR_NOT_ENOUGH_ENERGY:
        // console.log('not enough energy')
        break

      default:
        console.log('Spawn Fail: ', spawnResult)
        break
    }
  }
}

module.exports = mainSpawn
