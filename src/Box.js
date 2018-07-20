import React from "react"
import PropTypes from 'prop-types'
import './Box.css'

const Box = (props) => {
  let style = {}
  if(props.showing) {
    style.backgroundColor = props.backgroundColor
  }
  return (
    <div
      className="box-container"
      style={style}
      onClick={props.onClick}
    />
  )
}

Box.propTypes = {
  showing: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Box
