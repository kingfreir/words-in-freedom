import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import themeStyles from '../../../../theme/styles'

import ColorControls from './ColorControls/ColorControls'
import FontControls from './FontControls/FontControls'

class Controls extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
    bordered: PropTypes.bool,
  }

  static defaultProps = {
    bordered: false,
  }

  render() {
    const {
      color,
      children,
      bordered,
    } = this.props
    return (
      <div style={{ ...styles.container, ...bordered ? themeStyles.bordered(color) : themeStyles.inverted }}>
        {children}
      </div>
    )
  }
}

const styles = {
  container: {
    flex: 0.4,
  }
}

const mapStateToProps = ({ color }) => ({ color })

Controls.Color = ColorControls
Controls.Fonts = FontControls

export default connect(mapStateToProps)(Controls)