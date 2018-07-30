import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { themeStyles } from '../../../../theme'

import DrawerItem from './components/DrawerItem/DrawerItem'

class Drawers extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    color: PropTypes.shape({}).isRequired,
    selectedFont: PropTypes.string.isRequired
  }

  render() {
    const {
      data,
      color,
      selectedFont,
    } = this.props

    return (
      <div style={{ ...styles.container, ...themeStyles.inverted }}>
        {data.map((item, index) => (
          <DrawerItem
            key={index}
            item={item}
            color={color}
            font={selectedFont}
          />))}
      </div>
    )
  }
}

const styles = {
  container: {
    flex: 0.8,
    display:'flex',
    flexDirection: 'column',
    position: 'relative'
  },
}

const mapStateToProps = ({ color, fonts }) => ({
  color,
  selectedFont: fonts.selected,
})

export default connect(mapStateToProps)(Drawers)