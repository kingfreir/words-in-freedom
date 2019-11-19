import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from "../../Icon/Icon";

class Slider extends Component {
  static propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    color: PropTypes.shape({}).isRequired,
    step: PropTypes.number,
    value: PropTypes.string,
    style: PropTypes.shape({})
  };

  static defaultProps = {
    minValue: 0,
    initialValue: 0,
    type: "format_size",
    step: 1,
    style: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value)
      this.setState({ value: this.props.value });
  }

  onChange = value => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const { color, minValue, maxValue, type, step, style } = this.props;

    const baseStyle = styles(color);
    return (
      <div style={{ ...baseStyle.container, ...style }}>
        <Icon type={type} />
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
      </div>
    );
  }
}

const styles = color => ({
  slider: {
    height: "2px",
    outline: "none",
    width: "100%"
  },
  container: {
    position: "relative",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "4px",
    marginBottom: "4px",
    height: "20px"
  },
  value: {
    fontFamily: "arial",
    fontSize: "14px",
    width: "20px",
    marginRight: "4px",
    textAlign: "center",
    color: color.foreground
  },
  label: {
    fontFamily: "arial",
    fontSize: "10px",
    width: "50px",
    textAlign: "center",
    color: color.foreground,
    marginRight: "8px"
  }
});

export default Slider;
