import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Slider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: this.props.initialValue,
    }
  }

  onChange = (value) => {
    this.setState({ value })
    this.props.onChange(value)
  }

  render() {
    const {
      color,
      minValue,
      maxValue,
      initialValue,
      label,
      step,
    } = this.props

    const baseStyle = styles(color)
    return (
      <div style={baseStyle.container}>
        <p style={baseStyle.label}>{label}</p>
        <input
          className="slider"
          type="range"
          step={step}
          min={minValue}
          max={maxValue}
          defaultValue={initialValue}
          style={baseStyle.slider}
          onChange={ev => this.onChange(ev.nativeEvent.target.value)}
        />
        <p style={baseStyle.value} >{this.state.value}</p>
      </div>
    )
  }
}

const styles = color => ({
  slider: {
    height: '2px',
    width: '90%',
    marginLeft: '-4px',
    marginRight: '4px',
    outline: 'none',
  },
  container: {
    position: 'relative',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '4px',
    marginBottom: '4px',
    height: '24px',
  },
  value: {
    fontFamily: 'arial',
    fontSize: '14px',
    marginRight: '4px',
    color: color.foreground
  },
  label: {
    fontFamily: 'arial',
    fontSize: '10px',
    color: color.foreground
  }
})

Slider.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.any,
  label: PropTypes.string,
  color: PropTypes.shape({}).isRequired,
  step: PropTypes.number,
}

Slider.defaultProps = {
  minValue: 0,
  initialValue: 0,
  label: '',
  step: 1,
}

export default Slider