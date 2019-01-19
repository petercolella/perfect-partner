import React from "react";
import styles from "../../styles.css"
import Google from "../Signin"

const Nav = () => (
  <nav className="navbar navbar-expand-sm nav-pp navbar-dark">
      {/*Brand/logo*/}
      <a className="navbar-brand" href="/">Logo</a>
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
