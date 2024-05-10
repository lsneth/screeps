function attacker(creep) {
  // locate closest hostile creep
  let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
  if (!target) {
    target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
  }

  if (target) {
    if (creep.attack(target) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target)
    }
  } else {
    creep.moveTo(Game.flags.attackerCamp1)
  }
}

module.exports = attacker
