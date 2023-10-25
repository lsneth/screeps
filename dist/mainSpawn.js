const buildCreeperRolesArray = require('creeperRoles')

function mainSpawn() {
  // define spawn structure to spawn at
  const spawnStructure = Game.spawns['Spawn1']

  if (!spawnStructure.spawning) {
    // get a random creeper role, respecting probabilities
    const creeperRolesArray = buildCreeperRolesArray()
    const random = Math.floor(Math.random() * creeperRolesArray.length)
    const creeperRole = creeperRolesArray[random]

    const spawnResult = spawnStructure.spawnCreep(creeperRole.parts, `${creeperRole.role}${Game.time.toString()}`, {
      memory: creeperRole.memory,
    })

    if (spawnResult === OK) {
      console.log('Spawn Success: ', creeperRole.role)
    } else if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
      // console.log('not enough energy)
    } else {
      console.log('Spawn Fail: ', spawnResult)
    }
  }
}

module.exports = mainSpawn
