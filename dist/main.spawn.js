const { roles, buildRolesArray } = require('./role.roles')

function mainSpawn() {
  // define spawn structure to spawn at
  const spawnStructure = Game.spawns['Spawn1']

  if (!spawnStructure.spawning) {
    // if there are no creeps, spawn a harvester
    if (!Game.creeps) {
      return spawnStructure.spawnCreep(roles.harvester.parts, `${roles.harvester.role}${Game.time.toString()}`, {
        memory: roles.harvester.memory,
      })
    }

    // get a random creep role, respecting probabilities
    const rolesArray = buildRolesArray()
    const random = Math.floor(Math.random() * rolesArray.length)
    const role = rolesArray[random]

    const spawnResult = spawnStructure.spawnCreep(role.parts, `${role.role}${Game.time.toString()}`, {
      memory: role.memory,
    })

    if (spawnResult === OK) {
      console.log('Spawn Success: ', role.role)
    } else if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
      // console.log('not enough energy')
    } else {
      console.log('Spawn Fail: ', spawnResult)
    }
  }
}

module.exports = mainSpawn
