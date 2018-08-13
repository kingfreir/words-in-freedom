import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Slider extends Component {
  static propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    color: PropTypes.shape({}).isRequired,
    step: PropTypes.number,
    value: PropTypes.string,
    style: PropTypes.shape({}),
  }
  
  static defaultProps = {
    minValue: 0,
    initialValue: 0,
    label: '',
    step: 1,
    style: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value,
    }
  }

  componentWillReceiveProps({ value }) {
    this.setState({ value })
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
      label,
      step,
      style,
    } = this.props

    const baseStyle = styles(color)
    return (
      <div style={{ ...baseStyle.container, ...style}}>
        <p style={baseStyle.label}>{label}</p>
        <input
          className="slider"
          type="range"
          step={step}
          min={minValue}
          max={maxValue}
          style={baseStyle.slider}
          value={this.state.value || minValue}
          onChange={ev => this.onChange(ev.nativeEvent.target.value)}
        />
        <p style={baseStyle.value} >{this.state.value || minValue}</p>
      </div>
    )
  }
}

const styles = color => ({
  slider: {
    height: '2px',
    outline: 'none',
    width: '100px',
  },
  container: {
    position: 'relative',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '4px',
    marginBottom: '4px',
  },
  value: {
    fontFamily: 'arial',
    fontSize: '14px',
    width: '20px',
    marginRight: '4px',
    textAlign: 'center',
    color: color.foreground
  },
  label: {
    fontFamily: 'arial',
    fontSize: '10px',
    width: '50px',
    textAlign: 'center',
    color: color.foreground,
    marginRight: '8px',
  }
})

export default Slider