import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ChromePicker } from 'react-color'
import invertColor from 'invert-color'
import { colorActions } from '../../../../../services/actions'

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

  render() {
    const {
      color
    } = this.props
    return (
      <ChromePicker color={color.background} disableAlpha onChange={this.onColorChange}/>
    )
  }
}

const mapDispatchToProps = {
  changeColor: colorActions.changeColor,
}

const mapStateToProps = ({ color }) => ({ color })

export default connect(mapStateToProps, mapDispatchToProps)(ColorControls)