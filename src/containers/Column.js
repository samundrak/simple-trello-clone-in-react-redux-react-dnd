import React from 'react';
import PropTypes from 'prop-types';
import AddCard from '../containers/AddCardContainer';
import AddColumn from '../containers/AddColumnContainer';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../store/consts';
import { shiftCard, removeCard, removeColumn } from '../store/actions';
import CardDropHolder from '../containers/CardDropHolder';

const columnTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    if (item.parentIndex === props.index) {
      return undefined;
    }
    props.dispatch(shiftCard({
      index: item.parentIndex,
      cardIndex: item.index,
    }, {
      index: props.index
    }));
  },
  canDrop(props) {
    return props.column.title && props.column.title.length;
  },
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}
class Column extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
  }

  handleRemoveCard(cardIndex) {
    return () => this.props.dispatch(
      removeCard(
        cardIndex,
        this.props.index,
      )
    );
  }

  handleRemoveColumn() {
    return () => this.props.dispatch(removeColumn(this.props.index));
  }

  render() {
    return this.props.connectDropTarget(
      <div className="col-sm-2 columnBox">
        { this.props.column.title ? <h5 className="columnTitle"> {this.props.column.title}</h5> : ''}
        <div className="row">
          { this.props.column.cards.map((item, cardIndex) => (
            <CardDropHolder
              dispatch={this.props.dispatch}
              index={cardIndex}
              item={item}
              handleRemoveCard={this.handleRemoveCard}
              parentIndex={this.props.index}
              key={cardIndex} />
          ))}
          { this.props.column.title
            ? <AddCard index={this.props.index} />
            : <AddColumn /> }
          { this.props.column.title ?
            <button onClick={this.handleRemoveColumn()} className="btn btn-danger">Remove this column</button>
            : ''}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  isOver: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default DropTarget(ItemTypes.CARD, columnTarget, collect)(Column);
