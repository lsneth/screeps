const harvestCodes = {
  0: 'harvest result: OK, the operation has been scheduled successfully.',
  1: 'harvest result: ERR_NOT_OWNER, you are not the owner of this creep, or the room controller is owned or reserved by another player.',
  4: 'harvest result: ERR_BUSY, the creep is still being spawned.',
  5: 'harvest result: ERR_NOT_FOUND, extractor not found. You must build an extractor structure to harvest minerals.',
  6: 'harvest result: ERR_NOT_ENOUGH_RESOURCES, the target does not contain any harvestable energy or mineral.',
  7: 'harvest result: ERR_INVALID_TARGET, the target is not a valid source or mineral object',
  9: 'harvest result: ERR_NOT_IN_RANGE, the target is too far away.',
  11: 'harvest result: ERR_TIRED, the extractor or the deposit is still cooling down.',
  12: 'harvest result: ERR_NO_BODYPART, there are no WORK body parts in this creep’s body.',
}

const transferCodes = {
  0: 'transfer result: OK, The operation has been scheduled successfully.',
  1: 'transfer result: ERR_NOT_OWNER, You are not the owner of this creep.',
  4: 'transfer result: ERR_BUSY, The creep is still being spawned.',
  6: 'transfer result: ERR_NOT_ENOUGH_RESOURCES, The creep does not have the given amount of resources.',
  7: 'transfer result: ERR_INVALID_TARGET, The target is not a valid object which can contain the specified resource.',
  8: 'transfer result: ERR_FULL, The target cannot receive any more resources.',
  9: 'transfer result: ERR_NOT_IN_RANGE, The target is too far away.',
  10: 'transfer result: ERR_INVALID_ARGS, The resourceType is not one of the RESOURCE_* constants, or the amount is incorrect.',
}

const buildCodes = {
  0: 'build result: OK, The operation has been scheduled successfully.',
  1: 'build result: ERR_NOT_OWNER, You are not the owner of this creep.',
  4: 'build result: ERR_BUSY, The creep is still being spawned.',
  6: 'build result: ERR_NOT_ENOUGH_RESOURCES, The creep does not have any carried energy.',
  7: 'build result: ERR_INVALID_TARGET, The target is not a valid construction site object or the structure cannot be built here (probably because of a creep at the same square).',
  9: 'build result: ERR_NOT_IN_RANGE, The target is too far away.',
  12: 'build result: ERR_NO_BODYPART, There are no WORK body parts in this creep’s body.',
}

const repairCodes = {
  0: 'repair result: OK, the operation has been scheduled successfully.',
  1: 'repair result: ERR_NOT_OWNER, you are not the owner of this creep.',
  4: 'repair result: ERR_BUSY, the creep is still being spawned.',
  6: 'repair result: ERR_NOT_ENOUGH_RESOURCES, the creep does not carry any energy.',
  7: 'repair result: ERR_INVALID_TARGET, the target is not a valid structure object.',
  9: 'repair result: ERR_NOT_IN_RANGE, the target is too far away.',
  12: "repair result: ERR_NO_BODYPART, there are no WORK body parts in this creep's body.",
}

const upgradeCodes = {
  0: 'upgrade result: OK, the operation has been scheduled successfully.',
  1: 'upgrade result: ERR_NOT_OWNER, you are not the owner of this creep or the target controller.',
  4: 'upgrade result: ERR_BUSY, the creep is still being spawned.',
  6: 'upgrade result: ERR_NOT_ENOUGH_RESOURCES, the creep does not have any carried energy.',
  7: 'upgrade result: ERR_INVALID_TARGET, the target is not a valid controller object, or the controller upgrading is blocked.',
  9: 'upgrade result: ERR_NOT_IN_RANGE, the target is too far away.',
  12: "upgrade result: ERR_NO_BODYPART, there are no WORK body parts in this creep's body.",
}

const spawnCodes = {
  0: 'spawn result: OK, the operation has been scheduled successfully.',
  1: 'spawn result: ERR_NOT_OWNER, you are not the owner of this spawn.',
  3: 'spawn result: ERR_NAME_EXISTS, there is a creep with the same name already.',
  4: 'spawn result: ERR_BUSY, the spawn is already in process of spawning another creep.',
  6: 'spawn result: ERR_NOT_ENOUGH_ENERGY, the spawn and its extensions contain not enough energy to create a creep with the given body.',
  10: 'spawn result: ERR_INVALID_ARGS, body is not properly described or name was not provided.',
  14: 'spawn result: ERR_RCL_NOT_ENOUGH, your Room Controller level is insufficient to use this spawn.',
}

module.exports = { buildCodes, harvestCodes, transferCodes, repairCodes, upgradeCodes, spawnCodes }
