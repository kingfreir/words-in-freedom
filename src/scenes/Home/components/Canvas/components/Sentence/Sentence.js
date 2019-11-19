import React, { Component } from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";

class Sentence extends Component {
  static propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    color: PropTypes.shape({
      foreground: PropTypes.string
    }).isRequired,
    sentence: PropTypes.string.isRequired,
    font: PropTypes.shape({
      family: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      rotation: PropTypes.string.isRequired,
      spacing: PropTypes.string
    }).isRequired,
    offsetParent: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
    onClickOver: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    editable: PropTypes.bool,
    onEditSentence: PropTypes.func.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string,
      fontColor: PropTypes.string,
      family: PropTypes.string,
      size: PropTypes.string,
      spacing: PropTypes.string,
      rotation: PropTypes.string,
      height: PropTypes.string,
      linkedToGlobal: PropTypes.bool
    }).isRequired
  };

  static defaultProps = {
    selected: false,
    editable: false
  };

  constructor(props) {
    super(props);

    this.state = {
      position: {
        x: props.initialX,
        y: props.initialY
      },
      family: undefined,
      fontColor: undefined,
      size: undefined,
      sentence: props.sentence,
      rotation: undefined,
      spacing: undefined,
      height: undefined,
      linkedToGlobal: false
    };

    this.span = React.createRef();
  }

  componentDidUpdate() {
    const { onEditSentence, item } = this.props;
    if (
      this.span.current &&
      this.span.current.textContent !== this.state.sentence
    ) {
      this.setState({ sentence: this.span.current.textContent }, () => {
        if (this.state.sentence !== this.props.sentence) {
          onEditSentence({ id: item.id, sentence: this.state.sentence });
        }
      });
    }
  }

  focus = () => {
    this.span.current.focus();
  };

  getTransformOrigin = () => {
    const { position } = this.state;
    const { offsetParent } = this.props;

    const originX = offsetParent.clientWidth / 2 - position.x;
    const originY = offsetParent.clientHeight / 2 - position.y;

    return `${originX}px ${originY}px`;
  };

  handleDrag = ev => {
    ev.stopPropagation();
    this.setState(() => {
      const x = ev.x - this.mouseX;
      const y = ev.y - this.mouseY;

      return { position: { x, y } };
    });
  };

  handleMouseDown = ev => {
    ev.stopPropagation();
    this.props.onClick();
    this.mouseX = ev.nativeEvent.x - this.state.position.x;
    this.mouseY = ev.nativeEvent.y - this.state.position.y;
  };

  setSentenceParameter = (params, linkedToGlobal) => {
    this.setState({
      ...params,
      linkedToGlobal
    });

    this.props.onEditSentence({
      id: this.props.item.id,
      ...params,
      linkedToGlobal
    });
  };

  getCustomStyle = () => {
    const { color, font } = this.props;
    const {
      fontColor,
      family,
      size,
      spacing,
      rotation,
      height,
      linkedToGlobal
    } = this.props.item;

    const isGlobal = (self, global) =>
      linkedToGlobal ? global : self || global;

    return {
      display: "inline-block",
      cursor: "pointer",
      whiteSpace: "pre",
      color: isGlobal(fontColor, color.foreground),
      fontFamily: isGlobal(family, font.family),
      fontSize: isGlobal(size, font.size) + "px",
      transform: `rotate(${isGlobal(rotation, font.rotation)}deg)`,
      transformOrigin: "center",
      letterSpacing: `${isGlobal(spacing, font.spacing)}px`,
      lineHeight: height ? `${height}px` : undefined,
      outline: "none"
    };
  };

  render() {
    const {
      sentence,
      initialX,
      initialY,
      onClick,
      onClickOver,
      editable,
      selected,
      ...props
    } = this.props;

    return (
      <Draggable
        axis="both"
        defaultPosition={{
          x: initialX,
          y: initialY
        }}
        position={this.state.position}
        onDrag={this.handleDrag}
        onMouseDown={this.handleMouseDown}
        handle=".sentence"
        disabled={editable}
        {...props}
      >
        <div
          style={{ position: "absolute" }}
          onClick={onClick}
          onClickCapture={onClickOver}
        >
          <span
            ref={this.span}
            contentEditable={editable && selected ? "true" : "false"}
            suppressContentEditableWarning="true"
            className="sentence"
            style={{ ...this.getCustomStyle() }}
          >
            {sentence}
          </span>
        </div>
      </Draggable>
    );
  }
}

export default Sentence;
