import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router";
import {connect} from "react-redux";

import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
} from "reactstrap";

import { logoutUser } from "../../actions/auth.js";
import { closeSidebar, openSidebar } from "../../actions/navigation.js";
import MenuIcon from "../Icons/HeaderIcons/MenuIcon.js";
import SearchBarIcon from "../Icons/HeaderIcons/SearchBarIcon.js";
import BellIcon from "../Icons/HeaderIcons/BellIcon.js";
import SearchIcon from "../Icons/HeaderIcons/SearchIcon.js";

import ProfileIcon from "../../assets/navbarMenus/pfofileIcons/ProfileIcon.js";
import MessagesIcon from "../../assets/navbarMenus/pfofileIcons/MessagesIcon.js";
import TasksIcon from "../../assets/navbarMenus/pfofileIcons/TasksIcon.js";

import logoutIcon from "../../assets/navbarMenus/pfofileIcons/logoutOutlined.svg";
import basketIcon from "../../assets/navbarMenus/basketIcon.svg";
import calendarIcon from "../../assets/navbarMenus/calendarIcon.svg";
import envelopeIcon from "../../assets/navbarMenus/envelopeIcon.svg";
import mariaImage from "../../assets/navbarMenus/mariaImage.jpg";
import notificationImage from "../../assets/navbarMenus/notificationImage.jpg";
import userImg from "../../assets/user.svg";

import s from "./Header.module.scss";
import "animate.css";

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleMenu = this.toggleMenu.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);

    this.state = {
      menuOpen: false,
      notificationsOpen: false,
      searchFocused: false,
    };
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  toggleSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
    } else {
      const paths = this.props.location.pathname.split('/');
      paths.pop();
      this.props.dispatch(openSidebar());
    }
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  toggleNotifications() {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  render() {

    return (
      <Navbar className={`${s.root} d-print-none`}>
        <div>
          <NavLink
            onClick={this.toggleSidebar}
            className={`d-md-none mr-3 ${s.navItem}`}
            href="#"
          >
            <MenuIcon className={s.menuIcon} />
          </NavLink>
        </div>
        <Nav className="ml-auto">
          <NavItem className="d-sm-none mr-4">
            <NavLink
              className=""
              href="#"
            >
              <SearchIcon />
            </NavLink>
          </NavItem>
          <Dropdown isOpen={this.state.notificationsOpen} toggle={this.toggleNotifications} nav id="basic-nav-dropdown" className="ml-3">
            <DropdownToggle nav caret className="navbar-dropdown-toggle">
              <span className={`${s.avatar} rounded-circle float-left mr-2`}>
              </span>
              <span className="small d-none d-sm-block ml-1 mr-2 body-1">Admin</span>
            </DropdownToggle>
            <DropdownMenu className="navbar-dropdown profile-dropdown" style={{ width: "194px" }}>
              <NavItem>
                <NavLink onClick={this.doLogout} href="#">
                  <button className="btn btn-primary rounded-pill mx-auto logout-btn" type="submit"><img src={logoutIcon} alt="Logout"/><span className="ml-1">Logout</span></button>
                </NavLink>
              </NavItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    )
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Header));

