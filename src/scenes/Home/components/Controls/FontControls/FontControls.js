import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fontActions } from '../../../../../services/actions'

class FontControls extends Component {
  static propTypes = {
    fonts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    selected: PropTypes.string.isRequired,
    changeFont: PropTypes.func.isRequired,
    color: PropTypes.shape({}).isRequired,
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
        <input type="range" />
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
}

const mapStateToProps = ({ fonts, color }) => ({ color, fonts: fonts.fonts, selected: fonts.selected })

export default connect(mapStateToProps, mapDispatchToProps)(FontControls)