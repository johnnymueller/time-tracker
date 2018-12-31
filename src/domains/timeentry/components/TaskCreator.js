import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { addTask } from 'domains/timeentry/ducks/tasks';

const actionMap = {
  addTask,
};

export class TaskCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  static propTypes = {
    addTask: PropTypes.func.isRequired,
  }

  addTask = () => {
    this.props.addTask(this.state.value);
    this.setState({value: ''});
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <TextField
          id="outlined-name"
          label="New Task"
          value={this.state.value}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <br />
        <Button variant="contained" color="primary" onClick={this.addTask}>Add Task</Button>
      </div>
    )
  }
}

export default connect(null, actionMap)(TaskCreator);
