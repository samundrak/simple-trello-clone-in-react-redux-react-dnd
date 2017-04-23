import React from 'react';
import PropTypes from 'prop-types';

class AddCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      addCard: false,
      description: '',
    }
  }

  cancel() {
    return () => this.setState({ addCard: false });
  }

  add() {
    return () => this.setState({ addCard: true });
  }

  handleDescription() {
    return event => this.setState({ description: event.target.value });
  }

  handleAddCard() {
    return () => {
      this.setState({
        addCard: false,
        description: '',
      });
      return this.props.add(this.state.description)();
    }
  }

  addCard() {
    return (
      <div>
        <input placeholder="Enter card description" onChange={this.handleDescription()} type="text"
               className="form-control" />
        <div className="btn-group">
          <button onClick={ this.handleAddCard() } className="btn btn-success">Save</button>
          <button onClick={this.cancel()} className="btn btn-success">Cancel</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.state.addCard
          ? this.addCard()
          : <button className="btn btn-success" onClick={this.add()}>Add a Card</button>
        }
      </div>
    );
  }
}
AddCard.propTypes = {
  add: PropTypes.func.isRequired,
};

export default AddCard;