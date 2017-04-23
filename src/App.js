import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import Column from './containers/Column';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row taskContainer">
            { this.props.columns.map((column, index) => (
              <Column column={column} key={index} index={index} dispatch={this.props.dispatch} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  columns: Proptypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    columns: state.columns,
  };
};
export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(App));
