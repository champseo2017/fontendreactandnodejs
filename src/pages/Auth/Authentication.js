import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    /* 
            เริ่มแรกเลยต้องเช็ค props ที่เรา map ไว้กับ authReducers
            src/redux/reducers/authReducers.js
            ว่า authenticated เป็น true หรือเปล่า ถ้าไม่ใช้ก็ redirect ไปหน้าแรก
        */
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push("signin");
      }
    }

    // เช็ค props authenticated ไว้ที่นี้ด้วยนะครับ
    componentDidUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push("signin");
      }
    }

    render() {
      /* 
            รูปแบบการทำเป็น HOC เราจะต้องส่ง ComposedComponent กลับไปพร้อม props เดิมของ component นั้นๆด้วย
           */
      return <ComposedComponent {...this.props} />;
    }
  }

  /* map เข้ากับ authReducers */
  function mapStateToProps(state) {
    return {
      authenticated: state.authReducers.authenticated
    };
  }

  return connect(mapStateToProps)(Authentication);
}
