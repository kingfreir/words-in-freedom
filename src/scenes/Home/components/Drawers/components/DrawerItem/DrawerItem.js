import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./DrawerItem.css";
import { themeStyles } from "../../../../../../theme";

class DrawerItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    color: PropTypes.shape({}).isRequired,
    open: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired
  };

  onDragStart = (ev, sentence) => {
    ev.dataTransfer.setData("sentence", sentence);
  };

  render() {
    const { item, color, open, onOpen } = this.props;

    return (
      <div style={styles.container(open)}>
        <button
          className={style.button}
          style={styles.button(color)}
          onClick={onOpen}
        >
          {item.name}
        </button>
        <div
          style={{
            display: open ? "flex" : "none",
            ...themeStyles.bordered(color),
            ...styles.content
          }}
        >
          {item.content.map(sentence => (
            <span
              key={sentence}
              draggable="true"
              onDragStart={e => this.onDragStart(e, sentence)}
              style={styles.sentence(color)}
            >
              {sentence}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

const styles = {
  container: isOpen => ({
    display: "flex",
    flexDirection: "column",
    marginBottom: "4px",
    flex: isOpen ? 1 : undefined
  }),
  content: {
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    margin: 0,
    padding: "4px",
    overflowY: "scroll",
    borderTopWidth: 0,
    height: "100%"
  },
  button: color => ({
    backgroundColor: color.foreground,
    color: color.background,
    textAlign: "left",
    fontSize: "14px",
    lineHeight: "7px",
    fontFamily: "monospace"
  }),
  sentence: color => ({
    backgroundColor: color.foreground,
    color: color.background,
    padding: "2px",
    margin: "4px",
    display: "inline-block",
    fontFamily: "monospace",
    fontsize: 14,
    cursor: "pointer"
  })
};

export default DrawerItem;
