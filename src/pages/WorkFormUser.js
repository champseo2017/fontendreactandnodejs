import React, { Component } from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {Field, reduxForm} from 'redux-form'
import moment from 'moment'
import {Button} from 'reactstrap'

import {getWork, saveWork} from '../redux/actions/workActions'
import renderField from '../Utils/renderFields'
// สร้างฟิลแบบ dropdown สำหรับใช้เลือกสถานที่
import renderLocation from '../Utils/renderLocations'

class WorkFormUser extends Component {
    /* 
        โหลดข้อมูลใส่ในฟอร์ม โดยเช็คก่อนว่ามีการส่ง id มาหรือไม่
        ถ้าส่ง id มาให้สั่ง dispatch get เอาข้อมูลงานซ่อม
    
    */
    componentDidMount(){
        const workld = (this.props.params.id) ? this.props.params.id : 0
        this.props.dispatch(getWork(workld)).then(()=>{
            this.handleInitialize()
        })
    }

    handleInitialize(){
        // การกำหนดค่า default ให้กับ dropdown (กำหนดเป็นค่า default)
        let initData = {
            "location_id":"select",
        };
        if(this.props.work.data){
            initData = this.props.work.data
        }

        this.props.initialize(initData);
    }
    render() {
        const {handleSubmit, work} = this.props
        const {data} = work
        if(work.isRejected){
            return <div className="alert alert-danger">Error:{data}</div>
        }
        if(work.isLoading){
            return <div>Loading...</div>
        }
        return (
            <div>
                
            </div>
        )
    }
}

export default WorkFormUser