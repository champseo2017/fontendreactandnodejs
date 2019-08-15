import axios from 'axios'
import config from '../../configure'

// ดึงเอา url ที่ใช้ fetch data มาเก็บไว้ใน BASE_URL
const BASE_URL = config.BASE_URL

/* 
ฟังก์ชั่นดึงข้อมูลสถานที่ทุกรายการโดยจะส่ง query ชื่อ term เข้าไปด้วยเพื่อนำไป filter สำหรับ es6 เราสามารถกำหนดค่า default ของ paramter ได้ 
*/

export const loadLocations = (term ='') => {
    return (dispatch) => {
        /* 
            ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ก่อนเพื่อจะแสดง loading 
        */
       dispatch({type:'LOAD_LOCATIONS_PENDING'})
       return axios.get(`${BASE_URL}/locations?term=${term}`,{
            /* 
                ต้องส่ง header ชื่อ authorization โดยส่ง token เข้าไป
                เพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            */
           headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                authorization: localStorage.getItem('token')
           }
       }).then(results => {
           /* 
            เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งมาจะอยู่ใน object ชื่อ data ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลย
           
           */
          dispatch({type:'LOAD_LOCATIONS_SUCCESS', payload:results.data})
       }).catch(err => {
           // กรณี error
           dispatch({type:'LOAD_LOCATIONS_REJECTED', payload: err.message})
       })
    }
}

// ฟังก์ชั่นดึงข้อมูลสถานที่ตาม id ที่ส่ง
export const getLocation = (id) => {
    return (dispatch) => {
        dispatch({type:'LOAD_LOCATION_PENDING'})
        return axios.get(`${BASE_URL}/locations/${id}`,{
            /* 
                ต้องส่ง header ชื่อ authorization โดยส่ง token เข้าไปเพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้อง
            */
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                authorization:localStorage.getItem('token')
            }
        }).then(results => {
            /* 
                เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload axios จะส่งข้อมูลกลับมากับ object ชื่อ data
            */
           dispatch({type:'LOAD_LOCATION_SUCCESS', payload: results.data})
        }).catch(err => {
            // กรณี error
            dispatch({type:'LOAD_LOCATION_REJECTED', payload: err.message})
        })
    }
}

// ฟังก์ชั่นบันทึกข้อมูลสถานที่โดยเราจะเช็คว่าเป็นการเพิ่มข้อมูลใหม่ หรือ ปรับปรุงข้อมูล

export const saveLocation = (values) => {
    /* 
        ถ้ามี values.id แสดงว่าเป็นการบันทึกการปรับปรุงข้อมูลจึงต้องส่ง method put 
        จะไป match กับ route ฝั่ง server คือ app.put('/locations/:id', requireAuth, locations.update) 
        แต่ถ้าไม่ใช้ให้ส่ง method post เพื่อเพิ่มข้อมูลใหม่
        post จะไป match กับ route ฝั่ง server คือ app.post('/locations', requireAuth, locations.create)
    */
   let _id =''
   let _method = 'post'
   if(values.id){
       _id = values.id
       _method = 'put' 
   }
   return (dispatch) => {
       /*   
        รูปแบบการใช้ axios อีกรูปแบบในการจะระบุ method ที่ต้องการต้องส่ง header ชื่อ authorization โดยส่ง token เข้าไปด้วย
       */
      return axios({
          method:_method,
          url:`${BASE_URL}/locations/${_id}`,
          data:values,
          header:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
              authorization:localStorage.getItem('token')
          }
      }).then(results => {
          /* 
            เมื่อข้อมูลส่งกลับมาต้องเช็คสถานะก่อนว่า code ซ้ำหรือไม่โดย server จะส่ง object ที่ชื่อว่า status และ message กลับมา
          */
            if(results.data.status){
                dispatch({type:'SAVE_LOCATION_REJECTED', payload:results.data.message})
            }else{
                dispatch({type:'SAVE_LOCATION_SUCCESS'})
            }
      }).catch(err => {
          // กรณี error
          dispatch({type:'SAVE_LOCATION_REJECTED', payload: err.message})
      })
   }
}

// ฟังก์ชั่นลบข้อมูลสถานที่ตาม id ที่ส่งเข้ามา
export const deleteLocation = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}/locations/${id}`,{
            /* 
                ต้องส่ง header ชื่อ authorization โดยส่ง token เข้าไปด้วย
            */
           headers:{

                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                authorization: localStorage.getItem('token')
           }
        }).then(results => {
            // ลบข้อมูลสำเร็จ
            dispatch({type:'DELETE_LOCATION_SUCCESS'})
        }).catch(err =>{
            // กรณี error
            dispatch({type:'DELETE_LOCATION_REJECTED', payload:err.message})
        })
    }
}

// ฟังก์ชั่นสำหรับ reset ค่า status เพื่อล้างค่าข้อความ error ที่ค้างอยู่
export const resetStatus = () => {
    return (dispatch) => {
        dispatch({type: 'SAVE_LOCATION_SUCCESS'})
    }
}