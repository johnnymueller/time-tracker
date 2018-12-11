import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getDuration } from 'lib/utils/time';

export default class HistoryItem extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      duration: PropTypes.number,
      description: PropTypes.string,
    }).isRequired,
    removeHistoryItem: PropTypes.func.isRequired,
  }
  
  removeHistoryItem = () => {
    this.props.removeHistoryItem(this.props.item.id);
  }

  render() {
    const {
      duration,
      description,
    } = this.props.item;

    return (
      <li>
        <div data-test="description">
          {description} - {getDuration(duration)}
        </div>
        <button onClick={this.removeHistoryItem}>X</button>
      </li>
    )
  }
}
