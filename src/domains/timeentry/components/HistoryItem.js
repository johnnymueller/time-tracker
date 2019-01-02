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

const actionMap = {
  removeItem,
};

export class HistoryItem extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.object,
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
      start,
      duration,
    } = this.props.item;

    return (
      <ListItem>
        <ListItemText
          primary={`${description} - ${getDuration(duration)}`}
          secondary={`${start}`}
          data-test="description"
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
