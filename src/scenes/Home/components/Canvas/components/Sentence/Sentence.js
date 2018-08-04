import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Draggable from 'react-draggable'

class Sentence extends Component {
  static propTypes = {
    initialX: PropTypes.number.isRequired,
    initialY: PropTypes.number.isRequired,
    color: PropTypes.shape({}).isRequired,
    sentence: PropTypes.string.isRequired,
    font: PropTypes.shape({
      family: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
    }).isRequired,
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
        <div>
          <span className="sentence" style={{...styles.sentence(color,font)}}>
            {sentence}
          </span>
        </div>
      </Draggable>
    )
  }
}

const styles = {
  sentence: (color, font) => ({
    position: 'absolute',
    display: 'inline-block',
    color: color.foreground,
    fontFamily: font.family,
    fontSize: font.size + 'px',
    transform: `rotate(${font.rotation}deg)`,
    cursor: 'pointer',
    whiteSpace: 'pre',
  })
}

export default Sentence
