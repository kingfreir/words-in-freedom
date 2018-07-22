import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Collapse from './components/Collapse/Collapse'

class Drawers extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    color: PropTypes.shape({}).isRequired,
  }

  render() {
    const {
      data,
      color
    } = this.props
    return (
      <div style={{ ...styles.container }}>
        {data.map((item, index) => <Collapse key={index} item={item} color={color}/>)}
      </div>
    )
  }
}

const styles = {
  container: {
    marginTop: '4px',
    flex: 0.8,
    overflowY: 'scroll',
  },
}

const mapStateToProps = ({ color }) => ({ color })
export default connect(mapStateToProps)(Drawers)