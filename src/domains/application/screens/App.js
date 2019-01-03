import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getDuration } from 'lib/utils/time';
// import store from 'lib/store';

import TaskSelector from 'domains/timeentry/components/TaskSelector';
import HistoryList from 'domains/timeentry/components/HistoryList';
// import TaskCreator from 'domains/timeentry/components/TaskCreator';
import { addItem } from 'domains/timeentry/ducks/history';
import { changeTask } from 'domains/timeentry/ducks/tasks';

///
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import FormControl from '@material-ui/core/FormControl';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import AlarmIcon from '@material-ui/icons/AlarmAdd';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
///

const actionMap = {
  addItem,
  changeTask,
};

const stateMap = (state) => ({
  tasks: state.tasks.list,
  currentTask: state.tasks.currentTask,
})

export class App extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    changeTask: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    currentTask: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      // taskId: '',
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
    // store.dispatch({ type: 'ADD' });
    this.setState({ message: '' });
    if (!this.props.currentTask) {
      this.setState({ message: 'You must select a task to add time.' })
      return;
    }

    if (this.state.trackingTime) {
      this.toggleTracking();
      // this.setState({ taskId: '' });
      this.props.changeTask('');
      this.setState({ currentTime: 0 });
    }

    this.props.addItem(R.prop('name', R.find(R.propEq('id', this.props.currentTask), this.props.tasks)), this.state.currentTime);
  }

  // handleChange = taskId =>
  //   this.setState({ taskId });

  removeHistoryItem = id =>
    this.setState(currentState => ({history: R.reject(R.propEq('id', id), currentState.history)}));

  render() {
    const {
      message,
      currentTime,
      trackingTime,
    } = this.state;

    // console.log(this.props);

    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <div className={classes.container}>
            <Avatar className={classes.avatar}>
              <AlarmIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Time Tracker
            </Typography>

            <form className={classes.form}>

              <div className="message">{message}</div>

              <TaskSelector />

              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => this.toggleTracking()}>
                    {trackingTime ? (
                      <PauseIcon />
                    ) : (
                      <PlayIcon />
                    )}
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => this.addTime()}><AddIcon /></Button>
                </Grid>
              </Grid>
              <div>
                <TextField
                  id="outlined-name"
                  label="Current Duration"
                  value={getDuration(currentTime)}
                  // onChange={this.handleChange}
                  readOnly
                  margin="normal"
                  variant="outlined"
                />
                {/* <input type="text" value={getDuration(currentTime)} readOnly /> */}
              </div>

              <Typography component="h1" variant="h5">Time</Typography>
              <HistoryList />

              {/* <TaskCreator /> */}

              {/* <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button> */}

            </form>
          </div>
        </Paper>
      </main>
    );
  }
}

export default connect(stateMap, actionMap)(withStyles(styles)(App));
