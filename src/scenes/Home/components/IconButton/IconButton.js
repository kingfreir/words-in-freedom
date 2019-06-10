import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactSVG from "react-svg";
import css from "./IconButton.css";
import icons from "../../../../icons";

class IconButton extends Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.keys(icons)),
    color: PropTypes.shape({}).isRequired,
    onPress: PropTypes.func,
    style: PropTypes.shape({}),
    disabled: PropTypes.bool,
    hold: PropTypes.bool
  };

  static defaultProps = {
    onPress: () => {},
    style: {},
    type: "",
    disabled: false,
    hold: false
  };

  handleHoldDown = () => {
    this.timer = setInterval(this.props.onPress, 150);
  };

  handleLetGo = () => {
    clearInterval(this.timer);
  };

  render() {
    const { type, color, onPress, style, disabled, hold } = this.props;

    return (
      <ReactSVG
        src={icons[type] || icons.done}
        className={css.iconButton}
        style={{ ...styles(color, disabled), ...style }}
        onClick={disabled ? () => {} : onPress}
        onMouseDown={hold ? this.handleHoldDown : () => {}}
        onMouseUp={hold ? this.handleLetGo : () => {}}
      />
    );
  }
}

const styles = (color, disabled) => ({
  fill: color.foreground,
  opacity: disabled ? 0.5 : 1,
  cursor: "pointer"
});

const mapStateToProps = ({ canvas }) => ({
  color: canvas.present.global.color
});
export default connect(mapStateToProps)(IconButton);
