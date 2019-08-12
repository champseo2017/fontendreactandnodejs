import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export default function(ComposedComponent) {
  class AuthenticationAdmin extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    /* 
            เริ่มแรกเลยต้องเช็ค props ที่เรา map ไว้กับ authReducers 
            /src/redux/reducers / authReducers.js
            ว่า data ที่รับมาจาก token แล้ว user_type เป็น 0 หรือไม่
            ถ้าเป็น 0 แสดงว่าเป็น ผู้ใช้ปกติ redirect ไปหน้าแรก
        */
    componentWillMount() {
      if (this.props.data) {
        if (this.props.data.user_type === 0) {
          this.context.router.push("/");
        }
      }
    }

    // เช็ค props authenticated
    componentWillUpdate(nextProps) {
      if (nextProps) {
        if (nextProps.data.user_type === 0) {
          this.context.router.push("/");
        }
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  // map เข้ากับ authReducers
  function mapStateToProps(state) {
    return {
      authenticated: state.authReducers.authenticated,
      data: state.authReducers.data
    };
  }
  return connect(mapStateToProps)(AuthenticationAdmin);
}
