const creeperClasses = [
  {
    role: 'harvester',
    currentCount:
      _(Game.creeps)
        .filter({ memory: { role: 'harvester' } })
        .size() || 0,
    maxCount: 6,
    parts: [WORK, CARRY, CARRY, CARRY, MOVE],
    memory: { role: 'harvester' },
  },
  {
    role: 'builder',
    currentCount:
      _(Game.creeps)
        .filter({ memory: { role: 'builder' } })
        .size() || 0,
    maxCount: 6,
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'builder', building: false },
  },
  {
    role: 'upgrader',
    currentCount:
      _(Game.creeps)
        .filter({ memory: { role: 'upgrader' } })
        .size() || 0,
    maxCount: 6,
    parts: [WORK, CARRY, CARRY, CARRY, MOVE],
    memory: { role: 'upgrader', upgrading: false },
  },
]

module.exports = creeperClasses
