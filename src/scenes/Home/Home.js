import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import styles from './Home.css'
import { drawerActions } from '../../services/actions'

import Header from './components/Header/Header'
import Drawers from './components/Drawers/Drawers'
import Canvas from './components/Canvas/Canvas'
import Controls from './components/Controls/Controls'

class Home extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
    drawers: PropTypes.shape({}).isRequired,
    getDrawers: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      downloadRequested: false,
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

  render() {
    const { color, drawers } = this.props

    return (
      <div className={[styles.home]}>
        <Helmet>
          <style type='text/css'>
            {`body { background-color: ${color.background}; }`}
          </style>
        </Helmet>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Header
            onDownload={this.handleDownload}
          />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center' }} >
          <div style={{ display: 'flex', flex: 0.20, flexDirection: 'column'}}>
            <Drawers data={Object.values(drawers)}/>
            <Controls ref={this.canvas} >
              <Controls.Fonts />
            </Controls>
          </div>
          <div style={{ display: 'flex', flex: 0.6, flexDirection: 'column'}}>
            <Canvas
              requestDownload={this.state.downloadRequested}
              onDownloadComplete={this.handleDownloadComplete}
            />
            <Controls bordered >
              <Controls.Color />
            </Controls>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ color, drawers }) => ({ color, drawers })

const mapDispatchToProps = {
  getDrawers: drawerActions.getDrawers
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
