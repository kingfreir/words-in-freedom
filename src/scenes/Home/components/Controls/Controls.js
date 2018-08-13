import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import themeStyles from '../../../../theme/styles'

import ColorControls from './ColorControls/ColorControls'
import FontControls from './FontControls/FontControls'
import SentenceControls from './SentenceControls/SentenceControls'

class Controls extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
    children: PropTypes.node.isRequired,
    bordered: PropTypes.bool,
    style: PropTypes.shape({}),
  }

  static defaultProps = {
    bordered: false,
    style: {},
  }

  render() {
    const {
      color,
      children,
      bordered,
      style,
    } = this.props
    return (
      <div style={{ ...styles.container, ...style, ...bordered ? themeStyles.bordered(color) : themeStyles.inverted }}>
        {children}
      </div>
    )
  }
}

const styles = {
  container: {
    flex: 0.4,
  }
}

const mapStateToProps = ({ color }) => ({ color })

Controls.Color = ColorControls
Controls.Fonts = FontControls
Controls.Sentence = SentenceControls

export default connect(mapStateToProps)(Controls)