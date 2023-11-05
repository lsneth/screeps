const { spawnCodes } = require('./utils.resultCodes')
const createRolesObject = require('./role.roles')

function customSpawnCreep(spawn, role) {
  const result = spawn.spawnCreep(role.parts, `${role.name}${Game.time.toString()}`, {
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
  // define spawn structure to spawn at
  const spawn = Game.spawns.Spawn1
  // get current creep counts
  const currentCreepCounts = _.countBy(Game.creeps, 'memory.role')
  // get roles object
  const roles = createRolesObject(spawn)

  // TODO: this transporter/harvester balance doesn't seem to be working quite how I think it is
  // if we don't have enough transporters
  if (
    // if there are less than 2 transporters per harvester AND
    ((currentCreepCounts.transporter || 0 * 2) < currentCreepCounts.harvester || 0) &&
    // if there are less transporters than max transporters
    (currentCreepCounts.transporter || 0 < roles.transporter.maxCount)
  ) {
    customSpawnCreep(spawn, roles.transporter)
  }
  // if we do have enough transporters
  else {
    for (const key in roles) {
      const role = roles[key]
      if ((currentCreepCounts[role.name] || 0) < role.maxCount) {
        customSpawnCreep(spawn, role)
        break
      }
    }
  }
}

module.exports = mainSpawn
