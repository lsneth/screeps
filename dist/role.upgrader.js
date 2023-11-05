const collect = require('./action.collect')
const { upgradeCodes } = require('./utils.resultCodes')

function upgrade(creep) {
  if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
    const result = creep.upgradeController(creep.room.controller)
    switch (result) {
      case OK:
        break

      case ERR_NOT_IN_RANGE:
        creep.moveTo(creep.room.controller)
        break

      default:
        Game.notify(`${upgradeCodes[-result]}`)
        console.log(`${upgradeCodes[-result]}`)
        break
    }
  } else {
    collect(creep)
  }
}

module.exports = upgrade
