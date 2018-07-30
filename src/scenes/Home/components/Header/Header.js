import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from './Header.css'
import IconButton from '../IconButton/IconButton'

class Header extends Component {
  static propTypes = {
    color: PropTypes.shape({}).isRequired,
    onDownload: PropTypes.func.isRequired,
  }

  render() {
    const {
      color,
      onDownload,
    } = this.props
    return (
      <div className={[style.header]}>
        <h1 style={styles.title(color)}>Manifesto Machine</h1>
        <div>
          <IconButton type="get_app" onPress={onDownload}/>
        </div>
      </div>
    )
  }
}

const styles = {
  title: color => ({
    color: color.foreground,
  })
}

const mapStateToProps = ({ color }) => ({ color })

export default connect(mapStateToProps)(Header)