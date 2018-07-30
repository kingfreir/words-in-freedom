import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'

class Sentence extends Component {
  static propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    color: PropTypes.shape({}).isRequired,
    sentence: PropTypes.string.isRequired,
    font: PropTypes.string.isRequired,
  }

  render() {
    const {
      sentence,
      color,
      font,
      initialX,
      initialY
    } = this.props

    return (
      <Draggable
        axis="both"
        defaultPosition={{
          x: initialX,
          y: initialY,
        }}
        position={null}
      >
        <span style={{...styles.sentence(color,font)}}>
          {sentence}
        </span>
      </Draggable>
    )
  }
}

const styles = {
  sentence: (color, font) => ({
    position: 'absolute',
    display: 'inline-block',
    color: color.foreground,
    fontFamily: font,
    cursor: 'pointer',
  })
}

export default Sentence
