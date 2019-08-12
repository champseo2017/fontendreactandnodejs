import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {render} from 'react-dom'
import {Modal, ModalHeader, Button, ModalBody, ModalFooter} from 'reactstrap'

/* 
รูปแบบการเขียนต่อไปนี้จะเข้าใจยากต้องใช้เวลานานเพื่อทำและทดสอบ
มันเป็นรูปแบบของการสร้าง Element ขึ้นมาใหม่
*/

export default class ReactConfirmModalDialog extends Component {
    // เก็บ State เพื่อกำหนดว่าจะให้แสดง Modal หรือไม่
    state = {
        modal: this.props.show
    }
    /* 
        ใช้งาน PropTypes เป็นการเซ็คค่า Props ที่ส่งเข้ามาว่าตรงตามที่เรากำหนดหรือไม่เหมือนการตรวจสอบการทำงาน
        ของโปรแกรมเพื่อไม่ให้เกิดข้อผิดพลาด
    */
   static propTypes = {
       type: PropTypes.string, // รับค่าข้อความ warning, info
       show: PropTypes.bool, // รับค่า true , false เพือกำหนดว่าจะแสดง Modal หรือไม่
       title: PropTypes.string, // รับค่าข้อความเพื่อแสดงหัวของ Modal
       message: PropTypes.string, // ข้อความที่ต้องการให้ปรากฏใน Modal
       confirmLabel: PropTypes.string, // ข้อความปุ่มยืนยัน
       cancelLabel: PropTypes.string, // ข้อความปุ่มยกเลิก
       onConfirm: PropTypes.func, // เมื่อยืนยันจะให้เรียกฟังก์ชั่นอะไร
       onCancel: PropTypes.func, // เมื่อยกเลิกจะให้เรียกฟังก์ชั่นอะไร
       children: PropTypes.node // สามารถระบุ element ย่อยได้ ปกติจะไม่ได้ใช้
   }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default reactConfirmModalDialog
