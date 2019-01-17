import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getDuration } from 'lib/utils/time';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import { removeItem } from 'domains/timeentry/ducks/history';
import { TextField } from '@material-ui/core';

const actionMap = {
  removeItem,
};

const timeInput = {
  width: 100,
  marginRight: 10,
};

export class HistoryItem extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      end_datetime: PropTypes.string,
      duration: PropTypes.number,
    }).isRequired,
    removeItem: PropTypes.func.isRequired,
  }

  removeItem = () => {
    this.props.removeItem(this.props.item.id);
  }

  render() {
    const {
      description,
      end_datetime,
      duration,
    } = this.props.item;

    return (
      <ListItem style={{paddingRight: 52}}>
        <ListItemText
          primary={`${description} - ${getDuration(duration)}`}
          secondary={`${moment(end_datetime).format('ddd MMM DD')}`}
          data-test="description"
        />
        <TextField
          id="outlined-name"
          style = {timeInput}
          label="Start Time"
          value={`${moment(end_datetime).clone().subtract(duration, 'seconds').format('HH:mm')}`}
          // onChange={this.handleChange}
          readOnly
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          style = {{width: 100}}
          label="End Time"
          value={`${moment(end_datetime).format('HH:mm')}`}
          // onChange={this.handleChange}
          readOnly
          margin="normal"
          variant="outlined"
        />
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
