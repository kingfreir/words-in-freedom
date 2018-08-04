import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fontActions } from '../../../../../services/actions'
import Slider from '../Slider/Slider'

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
    } = this.props

    return (
      <div>
        <Select
          defaultValue={this.options[0]}
          options={this.options}
          onChange={this.handleChange}
          styles={styles(color)}
          maxMenuHeight={200}
        />
        <Slider
          color={color}
          onChange={this.props.changeFontSize}
          minValue={10}
          maxValue={60}
          initialValue={fontSize}
          label="Font Size"
        />
        <Slider
          color={color}
          onChange={this.props.changeRotation}
          minValue={0}
          maxValue={180}
          initialValue={rotation}
          label="Rotation"
        />
      </div>
    )
  }
}

const styles = color => ({
  control: styles => ({
    ...styles,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: color.foreground,
    color: color.background,
  }),
  option: (styles, { data }) => ({
    ...styles,
    fontFamily: data.value,
    color: color.foreground,
  }),
  dropdownIndicator: styles => ({
    ...styles,
    color: color.background,
  }),
  indicatorSeparator: styles => ({
    ...styles,
    backgroundColor: color.background,
  }),
  menu: styles => ({
    ...styles,
    borderRadius: 0,
    backgroundColor: color.background,
    borderWidth: '2px',
    borderColor: color.foreground,
    borderStyle: 'solid',
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    fontFamily: data.value,
    color: color.background,
  })
})

const mapDispatchToProps = {
  changeFont: fontActions.changeFont,
  changeFontSize: fontActions.changeFontSize,
  changeRotation: fontActions.changeRotation,
}

const mapStateToProps = ({ fonts, color }) => ({
  color,
  fonts: fonts.fonts,
  selected: fonts.selected,
  fontSize: fonts.size,
  rotation: fonts.rotation,
})

export default connect(mapStateToProps, mapDispatchToProps)(FontControls)