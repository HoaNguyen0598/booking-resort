import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import logo from "../../images/copy.png";
import './style.scss'
export default class Navbar extends Component {
  state = {
    isOpen: false
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Beach Resort" />
            </Link>
            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/rooms">Phòng</Link>
            </li>
            <li>
              <Link to="/trip">Trip</Link>
            </li>
            <li>
              <Link to="/tintuc">Tin tức</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li>
              <a href='http://localhost:5000/'>Đăng nhập</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}