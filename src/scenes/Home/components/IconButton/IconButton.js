import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import css from './IconButton.css'
import icons from '../../../../icons'

const IconButton = ({
  type,
  color,
  onPress,
  style,
}) => (
  <ReactSVG path={icons[type] || icons.done} className={css.iconButton} svgStyle={{ fill: color.foreground, ...style } } onClick={onPress}/>
)

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.keys(icons)),
  color: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func,
  style: PropTypes.shape({})
}

IconButton.defaultProps = {
  onPress: () => {},
  style: {},
  type: '',
}

const mapStateToProps = ({ color }) => ({ color })
export default connect(mapStateToProps)(IconButton)
