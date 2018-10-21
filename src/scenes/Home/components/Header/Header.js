import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Header.css'
import IconButton from '../IconButton/IconButton'

class Header extends Component {
  static propTypes = {
    onDownload: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
  }

  render() {
    const {
      onDownload,
      onEdit,
      editable,
    } = this.props
    return (
      <div className={[style.header]}>
          <IconButton type={editable ? "done" : 'create'} onPress={onEdit}/>
          <IconButton type="share" onPress={() => {}}/>
          <IconButton type="get_app" onPress={onDownload}/>
      </div>
    )
  }
}

export default Header