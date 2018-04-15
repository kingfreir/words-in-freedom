import React from 'react'
import './MainBody.css'
import Drawers from './components/Drawers/Drawers'
import Canvas from './components/Canvas/Canvas'
import Controls from './components/Controls/Controls'

const MainBody = () => (
  <div className="body-container">
    <div className="body-left">
      <Drawers />
    </div>
    <div className="body-right">
      <Canvas />
      <Controls />
    </div>
  </div>
)

export default MainBody