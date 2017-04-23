import React from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { ItemTypes } from '../store/consts';
import Card from '../components/Card';
import { swapCard } from '../store/actions';

const cardDropTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    const data = {
      src: {
        columnIndex: item.parentIndex,
        cardIndex: item.index,
      },
      target: {
        columnIndex: props.parentIndex,
        cardIndex: props.index,
      },
    };
    props.dispatch(swapCard(data.src, data.target));
  },
  canDrop() {
    return true;
  },
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

const CardDropHolder = ({
                          isOver,
                          connectDropTarget,
                          item,
                          handleRemoveCard,
                          index,
                          parentIndex
                        }) =>
  connectDropTarget(
    <div style={{ padding: '5px', opacity: isOver ? 0.5 : 1 }}>
      <Card
        createdAt={item.createdAt}
        description={item.description}
        index={index}
        parentIndex={parentIndex}
        handleRemoveCard={handleRemoveCard}
      />
    </div>
  );
CardDropHolder.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  parentIndex: PropTypes.number.isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
export default DropTarget(ItemTypes.CARD, cardDropTarget, collect)(CardDropHolder);