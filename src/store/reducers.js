import defaultState from './state';
import * as consts from './consts';

export default (state = defaultState, actions) => {
  let newState = {};
  let columns = [].concat(state.columns);
  switch (actions.type) {
    case consts.ADD_COLUMN:
      columns = [].concat(state.columns);
      columns[columns.length - 1] = {
        title: actions.columnName,
        cards: [],
      };
      columns.push({
        title: '',
        cards: [],
      });
      newState = { columns };
      break;

    case consts.ADD_CARD:
      columns[actions.columnIndex].cards.push({
        createdAt: Date.now(),
        description: actions.description,
      });
      newState = { columns };
      break;

    case consts.SHIFT_CARD:
      const { srcColumnIndex, targetColumnIndex, srcCardIndex } = actions;
      if (srcColumnIndex !== targetColumnIndex) {
        const card = Object.assign({}, columns[srcColumnIndex].cards[srcCardIndex]);
        columns[srcColumnIndex].cards.splice(srcCardIndex, 1);
        columns[targetColumnIndex].cards.push(card);
        newState = { columns };
      }
      break;

    case consts.REMOVE_CARD:
      columns[actions.columnIndex].cards.splice(actions.cardIndex, 1);
      newState = { columns };
      break;

    case consts.REMOVE_COLUMN:
      columns.splice(actions.columnIndex, 1);
      newState = { columns };
      break;
    case consts.SWAP_CARD:
      const { src, target } = actions;
      [
        columns[src.columnIndex].cards[src.cardIndex], 
        columns[target.columnIndex].cards[target.cardIndex]
      ] = [
        columns[src.columnIndex].cards[target.cardIndex],
        columns[target.columnIndex].cards[src.cardIndex]
      ]
      newState = { columns };
      break;
    default:
      newState = state;
      break;
  }
  return Object.assign({}, state, newState);
}