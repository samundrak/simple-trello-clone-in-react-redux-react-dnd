import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddColumn from '../components/AddCard';
import { addCard } from '../store/actions';

class AddCardContainer extends React.Component {

  constructor(props) {
    super(props);
    this.add = this.add.bind(this);
  }

  add(description) {
    return () => {
      if (!description || !description.length) {
        return false;
      }
      this.props.dispatch(addCard(description, this.props.index));
      return true;
    }
  }

  render() {
    return (
      <AddColumn add={this.add} />
    );
  }
}

AddCardContainer.propTypes = {
  index: PropTypes.number.isRequired,
};

export default connect()(AddCardContainer);