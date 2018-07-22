import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fontActions } from '../../../../../services/actions'

class FontControls extends Component {
  static propTypes = {
    fonts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    changeFont: PropTypes.func.isRequired,
    getFonts: PropTypes.func.isRequired,
  }

  render() {

    return (
      <div />
    )
  }
}

const mapDispatchToProps = {
  getFonts: fontActions.getFonts,
}

const mapStateToProps = ({ fonts }) => ({ fonts })

export default connect(mapStateToProps, mapDispatchToProps)(FontControls)