const { roles, buildRolesArray } = require('./role.roles')

function mainSpawn() {
  // define spawn structure to spawn at
  const spawn = Game.spawns['Spawn1']

  // if the spawn isn't busy spawning
  if (!spawn.spawning) {
    // if there isn't already a creep role queued
    if (!spawn.memory.nextRole) {
      // get a random creep role, respecting probabilities, save it to memory
      const rolesArray = buildRolesArray()
      const random = Math.floor(Math.random() * rolesArray.length)
      spawn.memory.nextRole = rolesArray[random]
    }

    // attempt to spawn the creep role in memory
    const role = roles[spawn.memory.nextRole]
    const spawnResult = spawn.spawnCreep(role.parts, `${role.role}${Game.time.toString()}`, {
      memory: role.memory,
    })

    if (spawnResult === OK) {
      // set nextRole to undefined so it picks a new role next time
      spawn.memory.nextRole = undefined
      console.log('Spawn Success: ', role.role)
    } else if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
      // console.log('not enough energy')
    } else {
      console.log('Spawn Fail: ', spawnResult)
    }

    // TODO: if there isn't at least 1 (or a certain length) of any given creeper role, spawn one before going to chance
    const prioritySpawn = roles.map((role) => role.role:false)
    for (const name in Game.creeps) {
      const creep = Game.creeps[name]
      if (creep.memory.role === 'harvester') {
        harvesterNeeded = false
      }
    }
    if (harvesterNeeded) {
      return spawn.spawnCreep(roles.harvester.parts, `${roles.harvester.role}${Game.time.toString()}`, {
        memory: roles.harvester.memory,
      })
    }

  }
}

module.exports = mainSpawn
