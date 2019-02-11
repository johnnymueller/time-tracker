import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import { TextField } from '@material-ui/core';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import { getDuration } from 'lib/utils/time';

import { updateItem, removeItem } from 'domains/timeentry/ducks/history';

const actionMap = {
  removeItem,
  // saveItem,
  updateItem,
};

const timeInput = {
  width: 100,
  marginRight: 10,
};

export class HistoryItem extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      task_name: PropTypes.string,
      end_datetime: PropTypes.string,
      duration: PropTypes.number,
    }).isRequired,
    updateItem: PropTypes.func.isRequired,
    // saveItem: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
  }

  removeItem = () => {
    this.props.removeItem(this.props.item.id);
  }

  handleChange = (time, position) => {
    this.props.updateItem(this.props.item, time.format('HH:mm:ss'), position);
  }

  render() {
    const {
      task_name,
      end_datetime,
      duration,
    } = this.props.item;

    return (
      <ListItem style={{paddingRight: 52}}>
        <ListItemText
          primary={`${task_name} - ${getDuration(duration)}`}
          secondary={`${moment(end_datetime).format('ddd MMM DD')}`}
          data-test="description"
        />
        <TimePicker
          style={timeInput}
          defaultValue={moment(end_datetime).clone().subtract(duration, 'seconds')}
          onChange={(val) => this.handleChange(val, 'start')}
        />
        <TimePicker
          style={timeInput}
          defaultValue={moment(end_datetime)}
          onChange={(val) => this.handleChange(val, 'end')}
        />
        {/* <TextField
          id="outlined-name"
          style = {timeInput}
          label="Start Time"
          value={`${moment(end_datetime).clone().subtract(duration, 'seconds').format('HH:mm:ss')}`}
          // onChange={this.handleChange}
          onChange={(e) => this.handleTheChange(e.target.value, 'start')}
          onBlur={() => this.handleBlur()}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          style = {{width: 100}}
          label="End Time"
          value={`${moment(end_datetime).format('HH:mm:ss')}`}
          // onChange={this.handleChange}
          onChange={(e) => this.handleTheChange(e.target.value, 'end')}
          onBlur={() => this.handleBlur()}
          margin="normal"
          variant="outlined"
        /> */}
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.removeItem}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default connect(null, actionMap)(HistoryItem);
