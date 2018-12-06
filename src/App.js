import React, { Component } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          duration: '1:15'
        },
        {
          id: 23,
          task_id: 1,
          duration: '0:15'
        },
        {
          id: 22,
          task_id: 74,
          duration: '0:30'
        },
        {
          id: 21,
          task_id: 2,
          duration: '3:00'
        },
      ],
      trackingTime: false,
      currentTime: 0,
    };
  }

  toggleTracking = () => {
    let tracking = this.state.trackingTime;
    this.setState({trackingTime: !tracking});
  }

  getDuration = (seconds) => {
    // NOTE: this approach breaks down when seconds exceed one day (86,400)
    let duration = moment.utc(seconds*1000).format('HH:mm:ss');
    return duration;
  }

  getTaskDescription = (id) => {
    let task = this.state.tasks.find((task) => { return task.id == id })
    return task.description
  }

  render() {
    return (
      <div className="App">
        <select>
          <option>Select Task</option>
          {this.state.tasks.map(function(task) {
            return <option key={task.id}>{task.description}</option>
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
        <div>{this.getDuration(this.state.currentTime)}</div>
        <ul>
          {this.state.history.map((item) => {
            return <li key={item.id}>{this.getTaskDescription(item.task_id)} - {item.duration}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
