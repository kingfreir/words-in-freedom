import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './DrawerItem.css'
import { themeStyles } from '../../../../../../theme'

class DrawerItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    color: PropTypes.shape({}).isRequired,
    font: PropTypes.string.isRequired,
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

  onToggle = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }))
  }

  render() {
    const {
      item,
      color,
      font
    } = this.props
    return (
      <div style={styles.container}>
        <button
          className={style.button}
          style={{ backgroundColor: color.foreground, color: color.background }}
          onClick={() => this.onToggle()}>
            {item.name}
        </button>
        <div style={{ display: this.state.isOpen ? 'block' : 'none', ...themeStyles.bordered(color), ...styles.content }}>
          {item.content.map(sentence =>
            <span
              key={sentence}
              draggable="true"
              onDragStart={(e) => this.onDragStart(e, sentence)}
              style={styles.sentence(color, font)}
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '4px',
  },
  content: {
    margin: 0,
    padding: '4px',
    overflowY: 'scroll',
    height: '300px'
  },
  sentence: (color, font) => ({
    backgroundColor: color.foreground,
    color: color.background,
    padding: '2px',
    margin: '4px',
    display: 'inline-block',
    fontFamily: font,
    cursor: 'pointer'
  }),
}

export default DrawerItem