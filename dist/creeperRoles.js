const creeperRoles = {
  harvester: {
    role: 'harvester',
    parts: [WORK, CARRY, CARRY, CARRY, MOVE],
    memory: { role: 'harvester' },
    probability: 6,
  },
  builder: {
    role: 'builder',
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'builder', building: false },
    probability: 3,
  },
  upgrader: {
    role: 'upgrader',
    parts: [WORK, CARRY, CARRY, CARRY, MOVE],
    memory: { role: 'upgrader', upgrading: false },
    probability: 3,
  },
  repairer: {
    role: 'repairer',
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'repairer', repairing: false },
    probability: 1,
  },
}

function buildCreeperRolesArray() {
  const creeperRolesArray = []
  for (let role in creeperRoles) {
    for (let i = 0; i < creeperRoles[role].probability; i++) {
      creeperRolesArray.push(creeperRoles[role])
    }
  }

  return creeperRolesArray
}

module.exports = buildCreeperRolesArray
