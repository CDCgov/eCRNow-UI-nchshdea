import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import './Header.css';

class Header extends Component {
  render() {
    // const location = window.location.pathname.split("/");
    return (
      <Navbar className="navbar" fixedtop="true">
        <div className="header-INT">
          <div className="logo">
            <div className="site-name">
              <h1>eCR Now &nbsp; &nbsp; Electronic Case Reporting(eCR)</h1>
            </div>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default Header;
