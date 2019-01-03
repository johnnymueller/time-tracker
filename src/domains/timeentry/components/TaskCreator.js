import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { addTask } from 'domains/timeentry/ducks/tasks';

const actionMap = {
  addTask,
};

export class TaskCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showModal: props.show,
    };
  }

  static propTypes = {
    addTask: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  }

  addTask = () => {
    this.props.addTask(this.state.value);
    this.setState({value: ''});
    // this.props.taskAdded();
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.showModal}>
        <DialogTitle id="simple-dialog-title">Create New Task</DialogTitle>
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
      </Dialog>
    )
  }
}

export default connect(null, actionMap)(TaskCreator);
