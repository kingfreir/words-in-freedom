import React, { Component } from 'react'
import { CustomPicker } from 'react-color'
import { Saturation, Hue } from 'react-color/lib/components/common'

class ColoPicker extends Component {
  render() {
    return (
      <div>
        <div style={styles.container}>
          <Saturation {...this.props} />
        </div>
        <div style={{ position: 'relative', height: '10px', width: '100px'}}>
          <Hue {...this.props}/>
        </div>
      </div>
    )
  }
}


//Estilo do color picker
const styles = {
  container: {
    position: 'relative',
    width: '100px',
    height: '100px',
  }
}

export default CustomPicker(ColoPicker)