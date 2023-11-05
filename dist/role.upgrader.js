const collect = require('./action.collect')
const { upgradeCodes } = require('./utils.resultCodes')

function upgrade(creep) {
  // if creep is collecting
  if (creep.memory.collecting) {
    collect(creep)
  }
  // if creep isn't collecting
  else {
    if (creep.store[RESOURCE_ENERGY] <= 0) {
      collect(creep)
    } else {
      const result = creep.upgradeController(creep.room.controller)
      switch (result) {
        case OK:
          break

        case ERR_NOT_IN_RANGE:
          creep.moveTo(creep.room.controller)
          break

        default:
          // Game.notify(upgradeCodes[result], creep.name)
          console.log(upgradeCodes[result], creep.name)
          break
      }
    }
  }
}

module.exports = upgrade
