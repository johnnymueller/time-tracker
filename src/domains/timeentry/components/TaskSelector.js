import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TaskSelector extends PureComponent {
  static propTypes = {
    tasks: PropTypes.array.isRequired,
    taskId: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    taskId: null
  }

  onChange = (event) => {
    this.props.onChange(parseInt(event.target.value, 10));
  }

  render() {
    return (
      <select value={this.props.taskId} onChange={this.onChange}>
        <option>Select Task</option>
        {this.props.tasks.map(function(task) {
          return <option key={task.id} value={task.id} data-test={`option-${task.id}`}>{task.description}</option>
        })}
      </select>
    )
  }
}
