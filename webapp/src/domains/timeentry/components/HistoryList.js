import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import List from '@material-ui/core/List';
import HistoryItem from './HistoryItem';

const stateMap = (state) => ({
  history: state.history.list,
})

export class HistoryList extends Component {
  static propTypes = {
    history: PropTypes.array.isRequired,
  }

  render() {
    return (
      <List>
      {this.props.history.map((item, key) => (
        <HistoryItem item={item} key={key} />
      ))}
    </List>
    )
  }
}

export default connect(stateMap)(HistoryList)
