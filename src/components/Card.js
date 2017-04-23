import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../store/consts';

const CardSource = {
  beginDrag(props) {
    return props;
  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
const Card = ({ handleRemoveCard, index, createdAt, description, connectDragSource, isDragging }) => connectDragSource(
  <div
    className="thumbnail"
    style={{
      opacity: isDragging ? 0.0 : 1
    }}
  >
    <div className="caption">
      <div className='col-lg-12'>
      </div>
      <div className='col-lg-12 well well-add-card'>
        <h4>{ description }</h4>
      </div>
      <div className='col-lg-12'>
        <p>{ new Date(createdAt).toLocaleString() }</p>
      </div>
    </div>
    <button
      onClick={handleRemoveCard(index)}
      type="button"
      className="btn btn-primary btn-xs btn-update btn-add-card">
      Remove
    </button>
  </div>
);

Card.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  createdAt: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  parentIndex: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  handleRemoveCard: PropTypes.func.isRequired,
};

export default DragSource(ItemTypes.CARD, CardSource, collect)(Card);