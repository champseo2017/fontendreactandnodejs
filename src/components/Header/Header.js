import React, { Component } from "react";
import { Link } from "react-router";
import {connect} from 'react-redux'
import { Collapse, NavbarToggler, NavbarBrand } from "reactstrap";

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  renderLinks() {
    /* 
      ตรวจสอบจาก reducer authReducers.js ที่เราได้ map ไว้ด้านล่าง
      โดยเช็คว่าถ้าหากมีการ signin ก็จะแสดงเมนูตามเงื่อนไข
    
    */
    if (this.props.authentication) {
      if (this.props.data.user_type === 0) {
        return [
          <li className="nav-item" key={2}>
            <Link to="/work" className="nav-link">
              แจ้งซ่อม
            </Link>
          </li>,
          <li className="nav-item" key={6}>
            <Link to="/signout" className="nav-link">
              Sign Out
            </Link>
          </li>
        ];
      } else {
        // ถ้าเป็นผู้ใช้งานประเภทผู้ดูแลปกติ จะแสดงทุกเมนู
        return [
          <li className="nav-item" key={2}>
            <Link to="/work" className="nav-link">
              แจ้งซ่อม
            </Link>
          </li>,
          <li className="nav-item" key={3}>
            <Link to="/workrepair" className="nav-link">
              งานซ่อม
            </Link>
          </li>,
          <li className="nav-item" key={4}>
            <Link to="/location" className="nav-link">
              สถานที่
            </Link>
          </li>,
          <li className="nav-item" key={5}>
            <Link to="/user" className="nav-link">
              ผู้ใช้งาน
            </Link>
          </li>,
          <li className="nav-item" key={6}>
            <Link to="/signout" className="nav-link">
              Sign Out
            </Link>
          </li>
        ];
      }
    } else {
      // ถ้าไม่ได้ทำการ Signin จะแสดงเมนูเดียวเท่านั้น
      return (
        <li className="nav-item" key={1}>
          <Link to="/signin" className="nav-link">
            Sign In
          </Link>
        </li>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <NavbarBrand href="/">itService</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <ul className="navbar-nav">{this.renderLinks()}</ul>
        </Collapse>
      </nav>
    );
  }
}

/* 
authentication เช็คว่าเป็น true หรือ false
data ตัวนี้จะได้ข้อมูล PAYLOAD จาก token 
ทั้งหมดทั้งมวลเราจัดการมาตั้งแต่ action, reducer 
*/
function mapStateToProps(state){
  return {
    authentication: state.authReducers.authenticated,
    data:state.authReducers.data
  }
}

export default connect(mapStateToProps)(Header);
