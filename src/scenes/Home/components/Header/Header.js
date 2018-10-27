import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import style from './Header.css'
import IconButton from '../IconButton/IconButton'

class Header extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    past: PropTypes.number.isRequired,
    future: PropTypes.number.isRequired,
  }

  render() {
    const {
      onEdit,
      onRedo,
      onUndo,
      editable,
      past,
      future,
    } = this.props

    return (
      <div className={[style.header]}>
          <IconButton type={editable ? "done" : 'create'} onPress={onEdit}/>
          <IconButton type="undo" onPress={onUndo} disabled={past === 0 }/>
          <IconButton type="redo" onPress={onRedo} disabled={future === 0} />
      </div>
    )
  }
}

const mapStateToProps = ({ canvas }) => ({
  past: canvas.past.length,
  future: canvas.future.length,
})

export default connect(mapStateToProps)(Header)