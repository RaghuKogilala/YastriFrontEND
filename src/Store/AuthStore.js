import {createSlice} from '@reduxjs/toolkit'

// created redux store using reduxjs toolkit
const autentication = createSlice({
    name:'authentication',
    initialState:{
        username:'',
        token:'',
        isAuth:false,
        id:'',
        email:''
    },
    reducers:{
        login(state,action){
            return {
                ...state,
                username:action.payload.userName,
                id:action.payload.userId,
                token:action.payload.token,
                email:action.payload.email,
                isAuth:true
            }
        },
        logout(state){
            return autentication.initialState
        }
    }
})

export const {login,logout} = autentication.actions

export default autentication.reducer