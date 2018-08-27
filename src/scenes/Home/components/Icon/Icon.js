import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import icons from '../../../../icons'

const Icon = ({
  type,
  color,
  style,
}) => (
  <ReactSVG
    path={icons[type] || icons.done}
    svgStyle={{ ...styles(color), ...style } }
  />
)

const styles = color => ({
  fill: color.foreground,
})

Icon.propTypes = {
  type: PropTypes.oneOf(Object.keys(icons)),
  color: PropTypes.shape({}).isRequired,
  style: PropTypes.shape({}),
}

Icon.defaultProps = {
  style: {},
  type: '',
}

const mapStateToProps = ({ color }) => ({ color })
export default connect(mapStateToProps)(Icon)
