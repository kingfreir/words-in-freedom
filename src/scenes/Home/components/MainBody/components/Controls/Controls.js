import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { colorActions } from '../../../../../../services/actions'
import styles from './Controls.css'

class Controls extends Component {

  changeColor() {
    const { changeColor } = this.props

    changeColor('white')
  }

  render() {
    return (
      <div className={`${styles.controls} color`}>
        <button onClick={this.changeColor('white')}/>
      </div>
    )
  }
}

Controls.propTypes = {
  changeColor: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  changeColor: colorActions.changeColor
}

export default connect(null, mapDispatchToProps)(Controls)