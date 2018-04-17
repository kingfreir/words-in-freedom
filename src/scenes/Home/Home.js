import React, { Component } from 'react'
import styles from './Home.css'

import MainHeader from './components/MainHeader/MainHeader'
import MainBody from './components/MainBody/MainBody'

class Home extends Component {
  render() {
    return (
      <div className={[styles.home]}>
        <MainHeader />
        <MainBody />
      </div>
    )
  }
}

export default Home
