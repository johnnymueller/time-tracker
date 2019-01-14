import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getDuration } from 'lib/utils/time';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
      id: PropTypes.string,
      description: PropTypes.string,
      end: PropTypes.object,
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
      end,
      duration,
    } = this.props.item;

    return (
      <ListItem>
        <ListItemText
          primary={`${description} - ${getDuration(duration)}`}
          secondary={`${end.format('ddd MMM DD')}`}
          data-test="description"
        />
        <TextField
          id="outlined-name"
          style = {timeInput}
          label="Start Time"
          value={`${end.clone().subtract(duration, 'seconds').format('HH:mm:ss')}`}
          // onChange={this.handleChange}
          readOnly
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          style = {{width: 100}}
          label="End Time"
          value={`${end.format('HH:mm:ss')}`}
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
