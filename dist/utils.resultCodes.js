export const resultCodes = {
  harvestCodes: {
    0: 'harvest result: OK, the operation has been scheduled successfully.',
    1: 'harvest result: ERR_NOT_OWNER, you are not the owner of this creep, or the room controller is owned or reserved by another player.',
    4: 'harvest result: ERR_BUSY, the creep is still being spawned.',
    5: 'harvest result: ERR_NOT_FOUND, extractor not found. You must build an extractor structure to harvest minerals.',
    6: 'harvest result: ERR_NOT_ENOUGH_RESOURCES, the target does not contain any harvestable energy or mineral.',
    7: 'harvest result: ERR_INVALID_TARGET, the target is not a valid source or mineral object',
    9: 'harvest result: ERR_NOT_IN_RANGE, the target is too far away.',
    11: 'harvest result: ERR_TIRED, the extractor or the deposit is still cooling down.',
    12: 'harvest result: ERR_NO_BODYPART, there are no WORK body parts in this creep’s body.',
  },
}
