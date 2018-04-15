import React from 'react'
import PropTypes from 'prop-types'
import styles from './Container.css'

const Container = (component) => (
  <div className={styles.container}>
    {component}
  </div>
)

Container.propTypes = {
  component: PropTypes.node.isRequired
}

export default Container