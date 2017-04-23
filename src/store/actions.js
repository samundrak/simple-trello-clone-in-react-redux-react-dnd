import * as consts from './consts';

export function addColumn(columnName) {
  return {
    type: consts.ADD_COLUMN,
    columnName,
  };
}
export function addCard(description, columnIndex) {
  return {
    type: consts.ADD_CARD,
    description,
    columnIndex,
  };
}
export function shiftCard(src, target) {
  return {
    type: consts.SHIFT_CARD,
    targetColumnIndex: target.index,
    srcColumnIndex: src.index,
    srcCardIndex: src.cardIndex,
  };
}
export function removeCard(cardIndex, columnIndex) {
  return {
    type: consts.REMOVE_CARD,
    cardIndex,
    columnIndex,
  };
}
export function removeColumn(columnIndex) {
  return {
    type: consts.REMOVE_COLUMN,
    columnIndex,
  };
}
export function swapCard(src, target) {
  return {
    type: consts.SWAP_CARD,
    src,
    target,
  };
}