import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import withStyles from '@material-ui/core/styles/withStyles';
import * as R from 'ramda';

import { changeTask } from 'domains/timeentry/ducks/tasks';
import { openModal } from 'domains/timeentry/ducks/modals';
import { taskListSelector, taskCurrentTaskSelector } from 'domains/timeentry/selectors/tasks';

import TaskCreatorModal from 'lib/modals/TaskCreatorModal';

const actionMap = {
  changeTask,
  openModal: () => openModal(TaskCreatorModal.modalKey),
};

const stateMap = (state) => ({
  tasks: taskListSelector(state),
  currentTask: taskCurrentTaskSelector(state),
});

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

export class TaskSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
    }
  }

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    currentTask: PropTypes.string.isRequired,
    changeTask: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this.InputLabelRef);
    this.setState({
      labelWidth: R.propOr(0, 'offsetWidth', domNode),
    });
  }

  onChange = (event) => {
    this.props.changeTask(event.target.value);
    if (event.target.value === 'ADD_NEW') {
      this.props.openModal();
    }
  }

  render() {
    const { classes, currentTask } = this.props;

    return (
      <div className={classes.container}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-task-simple"
          >
            Select Task
          </InputLabel>
          <Select
            value={currentTask}
            onChange={this.onChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="task"
                id="outlined-task-simple"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.tasks.map(function(task) {
              return <MenuItem
                      key={task.id}
                      value={task.id}
                      data-test={`option-${task.id}`}>
                        {task.name}
                     </MenuItem>
            })}
          </Select>
        </FormControl>
      </div>
    )
  }
}

export default connect(stateMap, actionMap)(withStyles(styles)(TaskSelector));
