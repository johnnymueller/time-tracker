import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { addTaskApi } from 'domains/timeentry/ducks/tasks';
import { openModalsSelector } from 'domains/timeentry/selectors/modals';
import { closeModal } from 'domains/timeentry/ducks/modals';

import TaskCreatorModal from 'lib/modals/TaskCreatorModal';

const actionMap = {
  addTaskApi,
  closeModal: () => closeModal(TaskCreatorModal.modalKey),
};

const modalKey = 'taskCreatorModal';

const stateMap = () => {
  const getModal = openModalsSelector(modalKey);
  return (state) => ({
    isOpen: getModal(state),
  });
};

export class TaskCreator extends Component {
  static modalKey = modalKey;

  static propTypes = {
    addTaskApi: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  }

  state = {
    value: '',
  };

  addTaskApi = () => {
    this.props.addTaskApi(this.state.value);
    this.setState({value: ''});
    this.props.closeModal();
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleClose = () => {
    this.props.closeModal();
  }

  render() {
    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.props.isOpen}>
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
        <Button variant="contained" color="primary" onClick={this.addTaskApi}>Add Task</Button>
      </Dialog>
    )
  }
}

export default connect(stateMap, actionMap)(TaskCreator);
