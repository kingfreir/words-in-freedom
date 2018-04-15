import React from 'react'
import styles from './MainBody.css'
import Drawers from './components/Drawers/Drawers'
import Canvas from './components/Canvas/Canvas'
import Controls from './components/Controls/Controls'

const MainBody = () => (
  <div className={styles['body-container']}>
    <div className={styles['body-left']}>
      <Drawers />
    </div>
    <div className={styles['body-right']}>
      <Canvas />
      <Controls />
    </div>
  </div>
)

export default MainBody