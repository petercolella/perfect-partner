import React from "react";
import "../../styles.css"
import Google from "../Signin"

const Nav = () => (
  <nav className="navbar navbar-expand-sm nav-pp navbar-dark">
      {/*Brand/logo*/}
      <a className="navbar-brand" href="/"><img className="logoIcon" alt="Logo" src="https://img.pokemondb.net/artwork/vector/luvdisc.png"/></a>
      {/*Links*/}
      <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/support">Support</a>
          </li>
          <li>
              <Google/>
          </li>
      </ul>

  </nav>
);

export default Nav;
