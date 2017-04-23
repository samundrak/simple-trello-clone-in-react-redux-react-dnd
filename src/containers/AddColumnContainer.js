import React from 'react';
import { connect } from 'react-redux';
import AddColumn from '../components/AddColumn';
import { addColumn } from '../store/actions';

class AddColumnContainer extends React.Component {

  constructor(props) {
    super(props);
    this.saveColumn = this.saveColumn.bind(this);
  }

  saveColumn(columnName) {
    return () => {
      if (!columnName || !columnName.length) {
        return false;
      }
      this.props.dispatch(addColumn(columnName));
      return true;
    }
  }

  render() {
    return (
      <AddColumn saveColumn={this.saveColumn} />
    );
  }
}
export default connect()(AddColumnContainer);