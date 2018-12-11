import React, { Component } from 'react';
import { getDuration } from 'lib/utils/time';
import TaskSelector from 'domains/timeentry/components/TaskSelector';
import HistoryItem from 'domains/timeentry/components/HistoryItem';
import * as R from 'ramda';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      taskId: 0,
      tasks: [
        {
          id: 1,
          description: 'Stand Up',
        },
        {
          id: 2,
          description: 'Check-In',
        },
        {
          id: 74,
          description: '1:1',
        },
      ],
      history: [],
      trackingTime: false,
      intervalId: null,
      currentTime: 0,
    };
  }

  toggleTracking = () => {
    let tracking = !this.state.trackingTime;
    this.setState({ trackingTime: tracking });

    if (tracking) {
      let intervalId = setInterval(this.increaseTime, 1000);
      this.setState({ intervalId });
    } else {
      clearInterval(this.state.intervalId);
    }
  }

  increaseTime = () => {
    let time = this.state.currentTime;
    this.setState({ currentTime: time + 1 });
  }

  addTime = () => {
    this.setState({ message: '' });
    if (!this.state.taskId) {
      this.setState({ message: 'You must select a task to add time.' })
      return;
    }

    if (this.state.trackingTime) {
      this.toggleTracking();
      this.setState({ taskId: 0 });
      this.setState({ currentTime: 0 });
    }

    let history = this.state.history;

    let historyItem = {
      id: history.length, // TODO: replace once using real data
      duration: this.state.currentTime,
      description: this.getTaskDescription(this.state.taskId),
    };

    history.unshift(historyItem);
    this.setState({ history });
  }

  getTaskDescription = (id) => {
    id = parseInt(id, 10);
    let task = this.state.tasks.find((task) => { return task.id === id })
    return task.description
  }

  handleChange = taskId =>
    this.setState({ taskId });

  removeHistoryItem = id =>
    this.setState(currentState => ({history: R.reject(R.propEq('id', id), currentState.history)}));

  render() {
    const {
      message,
      taskId,
      tasks,
      currentTime,
      history,
      trackingTime,
    } = this.state;

    return (
      <div className="App">
        <div className="message">{message}</div>
        <TaskSelector
          taskId={taskId}
          tasks={tasks}
          onChange={this.handleChange}
        />
        <br />
        <button onClick={() => this.toggleTracking()}>
          {trackingTime ? (
            <span>Stop</span>
          ) : (
              <span>Start</span>
            )}
        </button>
        <button onClick={() => this.addTime()}>Add</button>
        <div>
          <input type="text" value={getDuration(currentTime)} readOnly />
        </div>
        <ul className="history">
          {history.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              removeHistoryItem={this.removeHistoryItem}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
