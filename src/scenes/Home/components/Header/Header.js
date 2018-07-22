import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from './Header.css'

class Header extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
  }

  render() {
    const { color } = this.props
    return (
      <div className={[style.header]}>
        <h1 style={{ color: color.foreground }}>Manifesto Machine</h1>
      </div>
    )
  }
}

const mapStateToProps = ({ color }) => ({ color })

export default connect(mapStateToProps)(Header)