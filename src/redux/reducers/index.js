import {combineReducers} from 'redux'
/* 
redux-form จะทำการเก็บ state และมี reducer ในตัวของมันเองดังนั้นเวลาเราจะใช้งาน redux-form เราต้องทำเหมือนว่ามันคือ reducer ตัวหนึ่งครับ
*/
import { reducer as formReducer } from 'redux-form'
import authReducers from './authReducers'
import userReducers from './userReducers'

const rootReducers = combineReducers({
    form:formReducer, // กำหนดชื่อ reducer ไว้ว่าชื่อ form นะครับตามคำแนะนำของ redux-form
    authReducers,
    userReducers
})

export default rootReducers