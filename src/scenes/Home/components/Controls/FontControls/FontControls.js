import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fontActions } from '../../../../../services/actions'
import Slider from '../Slider/Slider'
import Select from '../Select/Select'

class FontControls extends Component {
  static propTypes = {
    fonts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selected: PropTypes.string.isRequired,
    changeFont: PropTypes.func.isRequired,
    changeFontSize: PropTypes.func.isRequired,
    color: PropTypes.shape({}).isRequired,
    fontSize: PropTypes.string.isRequired,
    changeRotation: PropTypes.func.isRequired,
    rotation: PropTypes.string.isRequired,
    changeSpacing: PropTypes.func.isRequired,
    spacing: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.options = props.fonts.map(font => ({
      value: font.family,
      label: font.family,
    }))
  }

  handleChange = option => {
    this.props.changeFont(option.value)
  }

  render() {
    const {
      color,
      fontSize,
      rotation,
      spacing,
    } = this.props

    return (
      <div>
        <Select
          color={color}
          defaultValue={this.options[0]}
          options={this.options}
          onChange={this.handleChange}
        />
        <Slider
          color={color}
          onChange={this.props.changeFontSize}
          minValue={10}
          maxValue={60}
          value={fontSize}
          type="format_size"
        />
        <Slider
          color={color}
          onChange={this.props.changeRotation}
          minValue={-180}
          maxValue={180}
          value={rotation}
          type="loop"
        />
        <Slider
          color={color}
          onChange={this.props.changeSpacing}
          minValue={-20}
          maxValue={20}
          value={spacing}
          type="border_color"
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  changeFont: fontActions.changeFont,
  changeFontSize: fontActions.changeFontSize,
  changeRotation: fontActions.changeRotation,
  changeSpacing: fontActions.changeSpacing,
}

const mapStateToProps = ({ fonts, color }) => ({
  color,
  fonts: fonts.fonts,
  selected: fonts.selected,
  fontSize: fonts.size,
  rotation: fonts.rotation,
  spacing: fonts.spacing,
})

export default connect(mapStateToProps, mapDispatchToProps)(FontControls)