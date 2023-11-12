const spawnCodes = {
  0: 'spawn result: OK, the operation has been scheduled successfully.',
  1: 'spawn result: ERR_NOT_OWNER, you are not the owner of this spawn.',
  3: 'spawn result: ERR_NAME_EXISTS, there is a creep with the same name already.',
  4: 'spawn result: ERR_BUSY, the spawn is already in process of spawning another creep.',
  6: 'spawn result: ERR_NOT_ENOUGH_ENERGY, the spawn and its extensions contain not enough energy to create a creep with the given body.',
  10: 'spawn result: ERR_INVALID_ARGS, body is not properly described or name was not provided.',
  14: 'spawn result: ERR_RCL_NOT_ENOUGH, your Room Controller level is insufficient to use this spawn.',
}

module.exports = { spawnCodes }
