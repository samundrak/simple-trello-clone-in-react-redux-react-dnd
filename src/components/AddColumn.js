import React from 'react';
import Proptypes from 'prop-types';

class AddColumn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columnName: '',
      addColumn: false,
    }
  }

  add() {
    return () => {
      this.setState({
        addColumn: true,
      });
    }
  }

  cancel() {
    return () => {
      this.setState({
        addColumn: false,
        columnName: '',
      });
    }
  }

  handleColumnName() {
    return (event) => {
      this.setState({
        columnName: event.target.value,
      });
    }
  }

  addColumn() {
    return (
      <div>
        <input placeholder="Enter column name" onChange={this.handleColumnName()} type="text"
               className="form-control" />
        <div className="btn-group">
          <button onClick={this.props.saveColumn(this.state.columnName) } className="btn btn-success">Save</button>
          <button onClick={this.cancel()} className="btn btn-success">Cancel</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="addBox">
        { this.state.addColumn
          ? this.addColumn()
          : <button className="btn btn-primary" onClick={this.add()}>Add a list</button>
        }
      </div>
    );
  }
}

AddColumn.propTypes = {
  saveColumn: Proptypes.func.isRequired,
};
export default AddColumn;