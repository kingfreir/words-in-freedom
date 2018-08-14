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
    onSentenceSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      content: [],
    }

    this.sentences = []
    this.canvas = React.createRef()
  }

  componentWillReceiveProps({ requestDownload }) {
    if (requestDownload && requestDownload !== this.props.requestDownload) {
      this.handleCanvas()
    }
  }

  handleRotation = () => {
    const { font } = this.props
    const radian = (font.rotation / 180) * Math.PI
    const sin  = Math.sin(radian)
    const cos = Math.cos(radian)

    console.log(sin,cos)
  }

  onDrop = (e) => {
    e.persist()
    const sentence = e.dataTransfer.getData("sentence")
    if (sentence) {
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

  handleSentenceRef = (ref, index) => {
    this.sentences[index] = ref
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
    const { color, font, onSentenceSelect } = this.props
  
    return (
      <div
        ref={this.canvas}
        droppable="true" 
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        style={{ ...styles.container, ...themeStyles.bordered(color)}}
      >
        {this.state.content.map((item, index) => (
          <Sentence
            ref={ref => this.handleSentenceRef(ref, index)}
            onClick={() => onSentenceSelect(this.sentences[index])}
            key={`${item.sentence}-${index}`}
            sentence={item.sentence}
            font={font}
            color={color}
            initialX={item.x}
            initialY={item.y}
            offsetParent={this.canvas.current}
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
    spacing: fonts.spacing,
  },
})

export default connect(mapStateToProps)(Canvas)