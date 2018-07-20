import React from 'react'
import PropTypes from 'prop-types'
import './Navbar.css'

const Navbar = ({onNewGame}) => {
  return (
    <header>
      <h2><a>Memory Game</a></h2>
      <nav>
        <li><a onClick={onNewGame}>New Game</a></li>
      </nav>
    </header>
  )
}

Navbar.propTypes = {
  onNewGame: PropTypes.func.isRequried
}

export default Navbar
