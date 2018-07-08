import React, { Component } from 'react'
import styles from './Home.css'

class Home extends Component {
  render() {
    return (
      <div className={[styles.home]}>
        <div style={{ flex: 0.2, backgroundColor: 'blue' }}/>
        <div style={{ flex: 0.8, backgroundColor: 'grey'}} />
      </div>
    )
  }
}

export default Home
