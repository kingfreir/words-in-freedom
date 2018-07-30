import React, { Component } from 'react'
import { CustomPicker } from 'react-color'
import { Saturation, Hue } from 'react-color/lib/components/common'

class ColoPicker extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Saturation {...this.props} />
        <div style={{ position: 'relative', height: '10%'}}>
          <Hue {...this.props}/>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'relative',
    width: '100px',
    height: '100px',
  }
}

export default CustomPicker(ColoPicker)