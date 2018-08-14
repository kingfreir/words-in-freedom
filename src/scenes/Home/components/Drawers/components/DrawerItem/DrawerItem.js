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
    open: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
  }

  onDragStart = (ev, sentence) => {
    ev.dataTransfer.setData("sentence", sentence)
  }

  render() {
    const {
      item,
      color,
      font,
      open,
      onOpen,
    } = this.props

    return (
      <div style={styles.container(open)}>
        <button
          className={style.button}
          style={{ backgroundColor: color.foreground, color: color.background, textAlign: 'left' }}
          onClick={onOpen}>
            {item.name}
        </button>
        <div style={{ display: open ? 'block' : 'none', ...themeStyles.bordered(color), ...styles.content }}>
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
  container: isOpen => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '4px',
    flex: isOpen ? 1 : undefined,
  }),
  content: {
    margin: 0,
    padding: '4px',
    overflowY: 'scroll',
    borderTopWidth: 0,
    flex: 1,
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