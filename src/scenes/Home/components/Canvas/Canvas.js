import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import html2canvas from 'html2canvas'
import themeStyles from '../../../../theme/styles'
import Controls from '../Controls/Controls'
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
    editable: PropTypes.bool.isRequired,
    onSentenceCreation: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      content: [],
      selected: null,
    }

    this.sentences = []
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

  handleSentenceClick = index => () => {
    this.setState({ selected: index })
  }

  handleSentenceCreation = (e) => {
    if((e.target !== this.canvas.current) || this.props.editable) return
    e.persist()
    this.props.onSentenceCreation()
    this.setState(state => ({
      selected: state.content.length,
      content: [...state.content, {
        sentence: ' ',
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      }]
    }), () => {
      this.sentences[this.state.content.length - 1].focus()
    })
  }

  render() {
    const { color, font, editable } = this.props
  
    return (
      <div
        ref={this.canvas}
        droppable="true" 
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        onClick={this.handleSentenceCreation}
        style={{ ...styles.container, ...themeStyles.bordered(color)}}
      >
        {this.state.content.map((item, index) => (
          <Sentence
            ref={ref => this.handleSentenceRef(ref, index)}
            onClick={this.handleSentenceClick(index)}
            selected={this.state.selected === index}
            editable={editable}
            key={`${item.sentence}-${index}`}
            sentence={item.sentence}
            font={font}
            color={color}
            initialX={item.x}
            initialY={item.y}
            offsetParent={this.canvas.current}
          />
        ))}
        {this.state.selected !== null && editable && <Controls.Sentence sentenceRef={this.sentences[this.state.selected]}/>}
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
    cursor: 'text',
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