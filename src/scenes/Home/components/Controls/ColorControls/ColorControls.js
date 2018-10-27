import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import invertColor from 'invert-color'
import { colorActions } from '../../../../../services/actions'
import ColorPicker from './ColorPicker/ColorPicker'

class ColorControls extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
    changeColor: PropTypes.func.isRequired,
  }

  onColorChange = (color) => {
    const { changeColor } = this.props

    changeColor({
      background: color.hex,
      foreground: invertColor(color.hex),
    })
  }

  // Random Color

  // Flip Colors

  // Set background/foreground
  
  render() {
    const {
      color
    } = this.props

    return (
      <ColorPicker
        color={color.background}
        onChange={this.onColorChange}
      />
    )
  }
}

const mapDispatchToProps = {
  changeColor: colorActions.changeColor,
}

const mapStateToProps = ({ canvas }) => ({ color: canvas.present.global.color })

export default connect(mapStateToProps, mapDispatchToProps)(ColorControls)