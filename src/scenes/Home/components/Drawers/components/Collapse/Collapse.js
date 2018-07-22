import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Collapse.css'
import { themeStyles } from '../../../../../../theme'

class Collapse extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    color: PropTypes.shape({}).isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  onDragStart = (ev, sentence) => {
    ev.dataTransfer.setData("sentence", sentence)
  }

  render() {
    const {
      item,
      color
    } = this.props
    return (
      <div style={{ marginBottom: '4px' }}>
        <button
          className={style.button}
          style={{ backgroundColor: color.foreground, color: color.background }}
          onClick={() => this.setState(state => ({ isOpen: !state.isOpen}))}>
            {item.name}
        </button>
        <div style={{ display: this.state.isOpen ? 'block' : 'none', ...themeStyles.bordered(color), ...styles.content }}>
          {item.content.map(sentence =>
            <span
              key={sentence}
              draggable="true"
              onDragStart={(e) => this.onDragStart(e, sentence)}
              style={styles.sentence(color)}
            >
              {sentence}
            </span>
          )}
        </div>
      </div>
    )
  }
}

const styles = {
  content: {
    margin: 0,
    padding: '4px',
    overflowY: 'scroll',
  },
  sentence: color => ({
    backgroundColor: color.foreground,
    color: color.background,
    padding: '2px',
    margin: '4px',
    display: 'inline-block',
    fontFamily: 'Alfphabet-I'
  }),
}

export default Collapse