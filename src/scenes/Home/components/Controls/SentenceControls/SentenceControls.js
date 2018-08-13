import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from '../Slider/Slider'

class SentenceControls extends Component {
  static propTypes = {
    sentenceRef: PropTypes.shape({
      setSentenceParameter: PropTypes.func,
    }),
    color: PropTypes.shape({}),
  }
  
  static defaultProps = {
    sentenceRef: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      isLinkedToGlobal: false,
      value: '',
    }
  }

  componentWillReceiveProps({ sentenceRef }) {
    if (sentenceRef !== this.props.sentenceRef) {
      this.setState({ value: sentenceRef.state.sentence || sentenceRef.props.sentence })
    }
  }

  handleSentenceChange = ev => {
    ev.persist()
    const { sentenceRef } = this.props

    const value = ev.nativeEvent.target.value

    this.setState({ value })
    sentenceRef.setSentenceParameter({ sentence: value }, this.state.isLinkedToGlobal)
  }

  handleParameter = param => value => {
    this.props.sentenceRef.setSentenceParameter({
      [param]: value,
    }, this.state.isLinkedToGlobal)
  }

  render() {
    const {
      sentenceRef,
      color,
    } = this.props

    const {
      props,
      state,
    } = sentenceRef

    const baseStyle = styles(color)

    return (
      <div style={baseStyle.container}>
        <textarea style={baseStyle.textarea} value={this.state.value} onChange={this.handleSentenceChange}/>
        <div style={baseStyle.sliders}>
          <Slider
            color={color}
            minValue={10}
            maxValue={60}
            onChange={this.handleParameter('size')}
            value={(state && state.size) || (props && props.font.size)}
            label="Font Size"
            style={baseStyle.slider}
          />
          <Slider
            color={color}
            minValue={4}
            maxValue={100}
            onChange={this.handleParameter('height')}
            value={(state && state.height) || (props && props.font.size)}
            label="Line Height"
            style={baseStyle.slider}
          />
          <Slider
            color={color}
            minValue={-180}
            maxValue={180}
            onChange={this.handleParameter('rotation')}
            value={(state && state.rotation) || (props && props.font.rotation)}
            label="Rotation"
            style={baseStyle.slider}
          />
          <Slider
            color={color}
            minValue={-20}
            maxValue={20}
            onChange={this.handleParameter('spacing')}
            value={(state && state.spacing) || (props && props.font.spacing)}
            label="Line Spacing"
            style={baseStyle.slider}
          />
        </div>
      </div>
    )
  }
}

const styles = color => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  slider: {
    width: '50%',
  },
  sliders: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    widt: '100%',
    flexWrap: 'wrap',
  },
  textarea: {
    flex: 1,
    resize: 'none',
    outline: 'none',
    color: color.foreground,
    backgroundColor: color.background,
  }
})

const mapStateToProps = ({ color }) => ({ color })

export default connect(mapStateToProps)(SentenceControls)