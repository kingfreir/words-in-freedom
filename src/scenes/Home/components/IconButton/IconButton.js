import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import chroma from 'chroma-js'
import ReactSVG from 'react-svg'
import css from './IconButton.css'
import icons from '../../../../icons'

const IconButton = ({
  type,
  color,
  onPress,
  style,
  disabled,
}) => (
  <ReactSVG
    path={icons[type] || icons.done}
    className={css.iconButton}
    svgStyle={{ ...styles(color, disabled), ...style } }
    onClick={disabled ? () => {} : onPress}
  />
)

const styles = (color, disabled )=> ({
  fill: color.foreground,
  opacity: disabled ? 0.5 : 1,
  cursor: 'pointer',
})

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.keys(icons)),
  color: PropTypes.shape({}).isRequired,
  onPress: PropTypes.func,
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
}

IconButton.defaultProps = {
  onPress: () => {},
  style: {},
  type: '',
  disabled: false,
}

const mapStateToProps = ({ color }) => ({ color })
export default connect(mapStateToProps)(IconButton)
