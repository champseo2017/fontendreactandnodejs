import axios from "axios";
import config from "../../configure";

// ดึงเอา url ที่ใช้ fetch data มาเก็บไว้ใน BASE_URL
const BASE_URL = config.BASE_URL;

/* 
ฟังก์ชั่นดึงข้อมูลรายการแจ้งซ้อมโดยส่ง query ชื่อ repair เพื่อนำไป where
โดยถ้าหากเป็น 0 จะแสดงทุกรายการ แต่ถ้า repair = 1จะแสดงเฉพาะรายการที่มีสถานะเป็น รอซ่อม และกำลังดำเนินการ เพื่อนำรายการนี้ไปแสดงในหน้าจอ งานรอซ่อม ซึ้งจะมองเห็นได้เฉพาะสิทธิ์ผู้ดูและระบบ
*/

export const loadWorks = (repair = 0) => {
  return dispatch => {
    // ก่อนดึงข้อมูลสั่ง dispatch ให้ reducer รู้ก่อนเพื่อจะแสดง loading
    dispatch({ type: "LOAD_WORKS_PENDING" });
    return axios
      .get(`${BASE_URL}/works?repair=${repair}`, {
        /* 
                ต้องส่ง heder ชื่อ authorization โดยส่ง token เข้าไปเพื่อบอกให้ server รู้ว่าเราได้ signin ถูกต้องแล้ว
            */
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=UTF-8",
          authorization: localStorage.getItem("token")
        }
      })
      .then(results => {
        /* 
            เมื่อข้อมูลส่งกลับมาก็สั่ง dispatch ให้ reducer รู้พร้อมส่ง payload
            เนื่องจากเราใช้ axios แทน fetch ดังนั้นข้อมูลที่ส่งจะอยู่ใน object ชื่อ data ที่มี Array อยู่ข้างใน ดังนั้นนำไป data.map ได้เลยครับ
        */
        dispatch({ type: "LOAD_WORKS_SUCCESS", payload: results.data });
      })
      .catch(err => {
        // กรณี error
        dispatch({ type: "LOAD_WORKS_REJECTED", payload: err.message });
      });
  };
};

/* 
    ฟังก์ชั่นดึงข้อมูลแจ้งซ่อมตาม id ที่ส่ง
*/
export const getWork = (id) => {
  return dispatch => {
    dispatch({ type: "LOAD_WORK_PENDING" });
    return axios.get(`${BASE_URL}/works/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: localStorage.getItem("token")
      }
    }).then(results => {
        dispatch({type:'LOAD_WORK_SUCCESS', payload:results.data})
    }).catch(err => {
        dispatch({type:'LOAD_WORK_REJECTED', payload: err.message})
    })
  };
};

/* 
ฟังก์ชั่นบันทึกข้อมูลแจ้งซ่อม โดยเราจะเช็คว่าเป็นการเพิ่มข้อมูลใหม่ หรือ ปรับปรุงข้อมูล
*/
export const saveWork = (values) => {
    /* 
        ถ้ามี values.id แสดงว่าเป็นการบันทึกการปรับปรุงข้อมูลจึงต้องส่ง method put
        จะไป match กับ route ฝั่ง server คือ app.put('/works/:id', requireAuth, works.update)
        แต่ถ้าไม่ใช้ให้ส่ง method post เพื่อเพิ่มข้อมูลใหม่
        post จะไป match กับ route ฝั่ง server คือ app.post('/works', requireAuth, works.create)
    */
   let _id = ''
   let _method ='post'
   if(values.id){
        _id = values.id
        _method = 'put'
   }

   return (dispatch) => {
       /* 
        รูปแบบการใช้ axios อีกรูปแบบในการจะระบุ method ที่ต้องการต้องส่ง headers ชื่อ authorization โดยส่ง token เข้าไปด้วย
       */
      return axios({
          method:_method,
          url:`${BASE_URL}/works/${_id}`,
          data:values,
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
            authorization: localStorage.getItem("token")
          }
      }).then(results => {
          dispatch({type:'SAVE_WORK_SUCCESS'})
      }).catch(err => {
        dispatch({type:'SAVE_WORKS_REJECTED', payload: err.message})
      })
   }
}


// ฟังก์ชั่นบันทึกข้อมูลการปฏิบัติงานซ่อม ซึ้งจะใช้งานสำหรับผู้ดูแลระบบเท่านั้น
export const saveRepair = (values) => {
    return (dispatch) => {
        return axios({
            method:'put',
            url:`${BASE_URL}/works/${values.id}/repair`,
            data:values,
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8",
                authorization: localStorage.getItem("token")
            }
        }).then(results => {
            dispatch({type:'SAVE_WORK_SUCCESS'})
        }).catch(err => {
            dispatch({type:'SAVE_WORKS_REJECTED', payload:err.message})
        })
    }
}

// ฟังก์ชันลบข้อมูลแจ้งซ่อมตาม id ที่ส่งเข้ามา
export const deleteWork = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}/works/${id}`,{
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8",
                authorization: localStorage.getItem("token")
            }
        }).then(results => {
            dispatch({type:'DELETE_WORKS_SUCCESS'})
        }).catch(err => {
            dispatch({type:'DELETE_WORKS_REJECTED', payload: err.message})
        })
    }
}