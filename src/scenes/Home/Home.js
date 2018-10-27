import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import homeStyles from './Home.css'
import { drawerActions } from '../../services/actions'

import Header from './components/Header/Header'
import Drawers from './components/Drawers/Drawers'
import Canvas from './components/Canvas/Canvas'
import Controls from './components/Controls/Controls'
import IconButton from './components/IconButton/IconButton'

class Home extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
    drawers: PropTypes.shape({}).isRequired,
    getDrawers: PropTypes.func.isRequired,
    undo: PropTypes.func.isRequired,
    redo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      downloadRequested: false,
      selected: undefined,
      openDrawers: false,
      editable: false,
    }
  }

  componentDidMount() {
    this.props.getDrawers()
  }
  
  handleDownload = () => {
    this.setState({ downloadRequested: true })
  }

  // Can receive result image as param for post-processing
  handleDownloadComplete = () => {
    this.setState({
      downloadRequested: false,
    })
  }

  handleSentenceSelection = (ref) => {
    this.setState({ selected: ref })
  }

  handlePanel = () => {
    this.setState(state => ({ openDrawers: !state.openDrawers }))
  }

  render() {
    const { color, drawers } = this.props

    return (
      <div className={[homeStyles.home]}>
        <Helmet>
          <style type='text/css'>
            {`
              body {
                background-color: ${color.background};
              }
              .slider {
                -webkit-appearance: none;
                appearance: none;
                background-color: ${color.foreground};
              }
              .slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                height: 16px;
                width: 16px;
                background-color: ${color.background};
                border-width: 2px;
                border-style: solid;
                border-color: ${color.foreground};
                border-radius: 8px;
                cursor: pointer;
              }
              .sentence:hover {
                opacity: 0.7;
              }
            `}
          </style>
        </Helmet>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Header
            onRedo={this.props.redo}
            onUndo={this.props.undo}
            onEdit={() => this.setState(state => ({ editable: !state.editable }))}
            editable={this.state.editable}
          />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
          <IconButton type="menu" onPress={this.handlePanel} />
          <div style={{ display: this.state.openDrawers ? 'flex' : 'none', flexDirection: 'column', width: '200px' }}>
            <Drawers data={Object.values(drawers)}/>
            <Controls ref={this.canvas} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <Controls.Fonts />
              <Controls.Color />
            </Controls>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column'}}>
            <Canvas
              requestDownload={this.state.downloadRequested}
              onDownloadComplete={this.handleDownloadComplete}
              onSentenceSelect={this.handleSentenceSelection}
              onSentenceCreation={() => this.setState({ editable: true })}
              editable={this.state.editable}
            />
          </div>
          <div style={{ marginTop: '4px'}}>
            <IconButton type="share" onPress={() => {}}/>
            <IconButton type="get_app" onPress={this.handleDownload} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ canvas, drawers }) => ({ color: canvas.present.global.color, drawers })

const mapDispatchToProps = {
  getDrawers: drawerActions.getDrawers,
  redo: ActionCreators.redo,
  undo: ActionCreators.undo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
