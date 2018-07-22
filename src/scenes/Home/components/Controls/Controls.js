import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import invertColor from 'invert-color'
import { colorActions } from '../../../../services/actions'
import themeStyles from '../../../../theme/styles'

import ColorControls from './ColorControls/ColorControls'
import FontControls from './FontControls/FontControls'

class Controls extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
    changeColor: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    bordered: PropTypes.bool,
  }

  static defaultProps = {
    bordered: false,
  }

  onColorChange = (color) => {
    const { changeColor } = this.props

    changeColor({
      background: color.hex,
      foreground: invertColor(color.hex),
    })
  }
  render() {
    const {
      color,
      children,
      bordered,
    } = this.props
    return (
      <div style={{ ...styles.container, ...bordered ? themeStyles.bordered(color) : { margin: '4px' }}}>
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

const mapDispatchToProps = {
  changeColor: colorActions.changeColor,
}

const mapStateToProps = ({ color }) => ({ color })

Controls.Color = ColorControls
Controls.Fonts = FontControls

export default connect(mapStateToProps, mapDispatchToProps)(Controls)