import React from "react"
import {Link} from 'react-router-dom'
const Nav = () => {
    return(
  <nav className="navbar navbar-expand-sm nav-pp navbar-dark">
      {/*Brand/logo*/}
      <a className="navbar-brand"><img className="logoIcon" alt="Logo" src="https://img.pokemondb.net/artwork/vector/luvdisc.png"/></a>
      {/*Links*/}
      <ul className="navbar-nav">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link" >About</Link></li>
          <li className="nav-item"><Link to="/support" className="nav-link" >Support</Link></li>
      </ul>
  </nav>
    )
};

export default Nav;
