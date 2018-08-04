import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import html2canvas from 'html2canvas'
import themeStyles from '../../../../theme/styles'

import Sentence from './components/Sentence/Sentence'

class Canvas extends Component {
  static propTypes = {
    color: PropTypes.shape({
      background: PropTypes.string.isRequired,
    }).isRequired,
    font: PropTypes.shape({
      family: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    }).isRequired,
    requestDownload: PropTypes.bool.isRequired,
    onDownloadComplete: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      content: [],
    }

    this.canvas = React.createRef()
  }

  componentWillReceiveProps({ requestDownload }) {
    if (requestDownload && requestDownload !== this.props.requestDownload) {
      this.handleCanvas()
    }
  }

  onDrop = (e) => {
    e.persist()
    const sentence = e.dataTransfer.getData("sentence")
    if (sentence) {
      console.log(e, this.canvas)
      this.setState(state => ({
        content: [...state.content, {
          sentence,
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
        }]
      }))
    }
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  handleCanvas = () => {
    const { color, onDownloadComplete } = this.props

    html2canvas(this.canvas.current, { backgroundColor: color.background, logging: false })
      .then(result => {
        const a = document.createElement('a')
        a.href = result.toDataURL("image/png").replace("image/png", "image/octet-stream")
        onDownloadComplete(a.href)
        a.download = 'Manifesto.png'
        a.click()
      })
  }

  render() {
    const { color, font } = this.props
    return (
      <div ref={this.canvas} droppable="true" onDrop={this.onDrop} onDragOver={this.onDragOver} style={{ ...styles.container, ...themeStyles.bordered(color)}}>
        {this.state.content.map((item, index) => (
          <Sentence
            key={`${item.sentence}-${index}`}
            sentence={item.sentence}
            font={font}
            color={color}
            initialX={item.x}
            initialY={item.y}
            parent={this.canvas.current}
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

const mapStateToProps = ({ color, fonts }) => ({
  color,
  font: {
    family: fonts.selected,
    size: fonts.size,
    rotation: fonts.rotation,
  },
})

export default connect(mapStateToProps)(Canvas)