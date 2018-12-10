import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      taskId: '',
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
      history: [
        {
          id: 24,
          task_id: 2,
          duration: 4500
        },
        {
          id: 23,
          task_id: 1,
          duration: 900
        },
        {
          id: 22,
          task_id: 74,
          duration: 1800
        },
        {
          id: 21,
          task_id: 2,
          duration: 10800
        },
      ],
      trackingTime: false,
      intervalId: null,
      currentTime: 0,
    };
  }

  toggleTracking = () => {
    let tracking = !this.state.trackingTime;
    this.setState({trackingTime: tracking});

    if (tracking) {
      let intervalId = setInterval(this.increaseTime, 1000);
      this.setState({intervalId});
    } else {
      clearInterval(this.state.intervalId);
    }
  }

  increaseTime = () => {
    let time = this.state.currentTime;
    this.setState({currentTime: time + 1});
  }

  addTime = () => {
    this.setState({message: ''});
    if (!this.state.taskId) {
      this.setState({message: 'You must select a task to add time.'})
      return;
    }

    if (this.state.trackingTime) {
      this.toggleTracking();
      this.setState({taskId: ''});
      this.setState({currentTime: 0});
    }

    let history = this.state.history;

    let historyItem = {
      id: history.length, // TODO: replace once using real data
      task_id: parseInt(this.state.taskId, 10),
      duration: this.state.currentTime
    };

    history.unshift(historyItem);
    this.setState({history});
  }

  getDuration = (seconds) => {
    // NOTE: this approach breaks down when seconds exceed one day (86,400)
    let duration = moment.utc(seconds*1000).format('HH:mm:ss');
    return duration;
  }

  getTaskDescription = (id) => {
    let task = this.state.tasks.find((task) => { return task.id === id })
    return task.description
  }

  handleChange = (event) => {
    this.setState({taskId: event.target.value});
  }

  removeHistoryItem = (item) => {
    let history = this.state.history;
    let index = history.indexOf(item);
    history.splice(index, 1);
    this.setState({history});
  }

  render() {
    return (
      <div className="App">
        <div className="message">{this.state.message}</div>
        <select value={this.state.taskId} onChange={this.handleChange}>
          <option>Select Task</option>
          {this.state.tasks.map(function(task) {
            return <option key={task.id} value={task.id}>{task.description}</option>
          })}
        </select>
        <br />
        <button onClick={() => this.toggleTracking()}>
          { this.state.trackingTime ? (
            <span>Stop</span>
          ) : (
            <span>Start</span>
          )}
        </button>
        <button onClick={() => this.addTime()}>Add</button>
        <div>
          <input type="text" value={this.getDuration(this.state.currentTime)} readOnly />
        </div>
        <ul className="history">
          {this.state.history.map((item) => {
            return <li key={item.id}>
                {this.getTaskDescription(item.task_id)} - {this.getDuration(item.duration)}
                &nbsp; <button onClick={() => this.removeHistoryItem(item)}>X</button>
              </li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
