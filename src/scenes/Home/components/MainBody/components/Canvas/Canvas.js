import React, { Component } from 'react'
import styles from './Canvas.css'

class Canvas extends Component {
  render() {
    return (
      <div className={`${styles.canvas} color`} />
    )
  }
}

export default Canvas