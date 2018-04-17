import React from 'react'
import PropTypes from 'prop-types'
import styles from './Title.css'

const Title = ({ title }) => (
  <h1 className={styles.title}>{title}</h1>
)

Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default Title