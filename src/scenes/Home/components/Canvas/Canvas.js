import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import html2canvas from 'html2canvas'
import { canvasActions } from '../../../../services/actions'
import themeStyles from '../../../../theme/styles'
import Controls from '../Controls/Controls'
import Sentence from './components/Sentence/Sentence'

const generateRandomID = () => String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now()

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
    updateCanvas: PropTypes.func.isRequired,
    canvas: PropTypes.shape({}).isRequired,
    editSentence: PropTypes.func.isRequired,
    selectSentence: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.sentences = {}
    this.canvas = React.createRef()

    this.state = {
      isDragging: false,
    }
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
      this.props.updateCanvas({
        id: generateRandomID(),
        sentence,
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      })
    }
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  handleSentenceRef = (ref, id) => {
    this.sentences[id] = ref
    if(ref) ref.focus()
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

  handleSentenceClick = id => () => {
    this.props.selectSentence(id)
  }

  handleSentenceCreation = (e) => {
    if((e.target !== this.canvas.current) || this.props.editable || this.state.isDragging) return
    e.persist()
    this.props.onSentenceCreation()
    this.props.updateCanvas({
      id: generateRandomID(),
      sentence: ' ',
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    })
  }

  render() {
    const { color, font, editable, canvas } = this.props

    return (
      <div
        ref={this.canvas}
        droppable="true" 
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        onClick={this.handleSentenceCreation}
        style={{ ...styles.container, ...themeStyles.bordered(color)}}
      >
        {Object.values(canvas.content).map((item) => (
          <Sentence
            ref={ref => this.handleSentenceRef(ref, item.id)}
            onStart={() => this.setState({ isDragging: true })}
            onClickOver={() => this.setState({ isDragging: false })}
            item={item}
            onClick={this.handleSentenceClick(item.id)}
            selected={canvas.selected === item.id}
            editable={editable}
            onEditSentence={this.props.editSentence}
            key={item.id}
            sentence={item.sentence}
            font={font}
            color={color}
            initialX={item.x}
            initialY={item.y}
            offsetParent={this.canvas.current}
          />
        ))}
        {canvas.selected !== null && editable && (
          <Controls.Sentence sentenceRef={this.sentences[canvas.selected]}/>
        )}
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

const mapStateToProps = ({ canvas }) => {
  const fonts = canvas.present.global.fonts

  return {
    canvas: canvas.present,
    color :canvas.present.global.color,
    font: {
      family: fonts.selected,
      size: fonts.size,
      rotation: fonts.rotation,
      spacing: fonts.spacing,
    },
  }
}

const mapDispatchToProps = {
  updateCanvas: canvasActions.updateCanvas,
  editSentence: canvasActions.editSentence,
  selectSentence: canvasActions.selectSentence,
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)