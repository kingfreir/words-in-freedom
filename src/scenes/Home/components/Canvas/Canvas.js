import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import themeStyles from '../../../../theme/styles'

import Sentence from './components/Sentence/Sentence'

class Canvas extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      content: [],
    }

    this.canvas = React.createRef()
  }

  setReference
  onDrop = (e) => {
    e.persist()
    this.setState(state => ({
      content: [...state.content, {
        sentence: e.dataTransfer.getData("sentence"),
        x: e.pageX - this.canvas.current.offsetLeft,
        y: e.pageY - this.canvas.current.offsetTop,
      }]
    }))
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  render() {
    const { color } = this.props
    return (
      <div ref={this.canvas} droppable="true" onDrop={this.onDrop} onDragOver={this.onDragOver} style={{ ...styles.container, ...themeStyles.bordered(color)}}>
        {this.state.content.map((item, index) => (
          <Sentence
            key={`${item.sentence}-${index}`}
            sentence={item.sentence}
            color={color}
            initialX={item.x}
            initialY={item.y}
          />
        ))}
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 0.8,
    overflow: 'hidden',
  }
}

const mapStateToProps = ({ color }) => ({ color })
export default connect(mapStateToProps)(Canvas)