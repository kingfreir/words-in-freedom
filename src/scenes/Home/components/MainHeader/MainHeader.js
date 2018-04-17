import React from 'react'
import styles from './MainHeader.css'

import Title from './components/Title/Title'

const MainHeader = () => (
  <div className={styles['main-header']}>
    <Title title="Manifesto Machine" />
  </div>
)

export default MainHeader