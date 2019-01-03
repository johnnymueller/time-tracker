import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { taskListSelector, taskCurrentTaskSelector } from '../selectors/tasks';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/core/styles/withStyles';
import * as R from 'ramda';

import TaskCreator from 'domains/timeentry/components/TaskCreator';
import { changeTask } from 'domains/timeentry/ducks/tasks';

const actionMap = { changeTask };

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
      newTaskModal: false,
    }
  }

  static propTypes = {
    tasks: PropTypes.array.isRequired,
    // taskId: PropTypes.string,
    // onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    currentTask: PropTypes.string.isRequired,
    changeTask: PropTypes.func.isRequired,
  }

  // static defaultProps = {
  //   taskId: null
  // }

  componentDidMount() {
    const domNode = ReactDOM.findDOMNode(this.InputLabelRef);
    this.setState({
      labelWidth: R.propOr(0, 'offsetWidth', domNode),
    });
  }

  onChange = (event) => {
    this.props.changeTask(event.target.value);
    if (event.target.value === 'ADD_NEW') {
      this.setState({'newTaskModal': true});
    }
  }

  handleClose = () => {
    this.setState({'newTaskModal': false});
  }

  // handleAddTask = () => {
  //   this.setState({'newTaskModal': false});
  //   // this.props.taskId = null;
  // }

  render() {
    // console.log(this.props)
    const { classes, currentTask } = this.props;

    return (
      <div className={classes.container}>
        <TaskCreator show={this.state.newTaskModal} />
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
