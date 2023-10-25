const creeperRoles = {
  harvester: {
    role: 'harvester',
    parts: [WORK, CARRY, CARRY, CARRY, MOVE],
    memory: { role: 'harvester' },
    probability: 4,
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
  // roadRepairer: {
  //   role: 'roadRepairer',
  //   parts: [WORK, WORK, CARRY, CARRY],
  //   memory: { role: 'roadRepairer', repairing: false },
  //   probability: 2,
  // },
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
