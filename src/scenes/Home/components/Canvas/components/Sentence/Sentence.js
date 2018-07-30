import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Sentence extends Component {
  static propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    color: PropTypes.shape({}).isRequired,
    sentence: PropTypes.string.isRequired,
    font: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      x: props.initialX,
      y: props.initialY,
    }
  }

  onDrag = e => {
    e.persist()
    this.setState(state => ({
      x: state.x + e.nativeEvent.offsetX,
      y: state.y + e.nativeEvent.offsetY,
    }))
  }

  render() {
    const {
      sentence,
      color,
      font,
    } = this.props

    const { x, y } = this.state
    return (
      <span
        style={{...styles.sentence(color,font), ...{ top: y, left: x }}}
        draggable
        onDrag={this.onDrag}
      >
        {sentence}
      </span>
    )
  }
}

const styles = {
  sentence: (color, font) => ({
    position: 'absolute',
    color: color.foreground,
    fontFamily: font,
  })
}

export default Sentence
