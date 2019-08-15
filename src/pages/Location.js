import React, { Component } from 'react'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import {

    loadLocations,
    getLocation,
    saveLocation,
    deleteLocation,
    resetStatus

} from '../redux/actions/locationActions'

import { Modal, ModalHeader } from 'reactstrap'
import { confirmModalDialog } from '../Utils/reactConfirmModalDialog'
import SearchBar from '../Utils/searchBar'

import LocationTable from '../components/Locations/LocationTable'
import LocationForm from '../components/Locations/LocationForm'

class Location extends Component {
    // มีการใช้ Modal ของ reactstrap ซึ้งจะต้องเก็บ State การแสดง modal ไว้
    state = {
        modal:false,
        modalTitle:''
    }
    // สั่ง dispatch ฟังก์ชัน loadLocations ดึงเอาข้อมูลรายชื่อสถานที่
    componentDidMount(){
        this.props.dispatch(loadLocations())
    }

    render() {
        const {locations, location, locationSave} = this.props
        // ถ้ามี error
        if(locations.isRejected){
            return <div>{locations.data}</div>
        }
        // debounce เป็นการหน่วงการส่งตัวอักษรเป็นฟังก์ชั่นของ lodash ทำเพื่อเรียกใช้การ filter ข้อมูล
        const locationSearch = debounce(term => {this.handleSearch(term)}, 500)

        return (
            <div>
                <h4>สถานที่</h4>
                <div className="form-group row">
                    <div className="col-sm-6">
                        {/*
                            ส่ง props onSearchTermChange ให้ Component SearchBar เพื่อ filgter
                            โดยฝั่ง SearchBar จะนำไปใช้กับ event onChange
                        */}
                        <SearchBar
                            onSearchTermChange={locationSearch}
                            placeholder="ค้นหา...รหัส, ชื่อสถานที่"
                        />
                    </div>
                </div>
                {/* แสดงข้อความ Loading ก่อน */}
                {locations.isLoading && <div>Loading...</div>}
                {/* Component LocationTable จะส่ง props ไป 4 ตัว */}
                <LocationTable
                    data={locations.data}
                    buttonNew={this.handleNew}
                    buttonEdit={this.handleEdit}
                    buttonDelete={this.handleDelete}
                />
                {/*
                    เป็น Component สำหรับแสดง Modal ของ reactstrap
                    ซึ้งเราต้องควบคุมการแสดงไว้ที่ไฟล์นี้ ถ้าทำแยกไฟล์จะควบคุมยาก
                
                */}
            </div>
        )
    }
}

export default Location