import {useReducer} from 'react'

let initializationAuth;

const authReducerFunc = (state = initializationAuth,action) => {
    switch(action.type){
        case 'UPDATE':
            let formValid = true
            const formData = {...state}
            for(const key in formData){
                if(key !== action.key && key !== "valid"){
                    
                    formValid = formValid && formData[key].valid
                }
                else{
                    formValid = formValid && action.valid
                }
            }
            state = {
                ...state,
                [action.key]:{
                    ...state[action.key],
                    value:action.value,
                    valid:action.valid
                },
                valid:formValid
            }
            return state
        case 'MESSAGE':
            state ={
                ...state,
                [action.key]:{
                    ...state[action.key],
                    message:action.message
                }
            }
            return state
        case 'CLEAR':
            return initializationAuth
       
        default:
            return state
    }
}



const useAuthForm = (initialization) => {

    initializationAuth = initialization

    const [authReducer,dispathAuth] = useReducer(authReducerFunc,initialization)

    const checkValidity = (event) => {
        let isValid = true
        if(event.target.name === "name"){
            isValid = isValid && event.target.value.length >= 2
            return isValid
        }
        if(event.target.name === "lastname"){
            isValid = isValid && event.target.value.length >= 2
            return isValid
        }
        if(event.target.name === "email"){
            isValid = isValid && /^\S+@\S+\.\S+$/.test(event.target.value)
            return isValid
        }
        if(event.target.name === "password"){
            isValid = isValid && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%_]).{6,}$/.test(event.target.value)
            return isValid
        }
        if(event.target.name === "confirmPassword"){
            isValid = isValid && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%_]).{6,}$/.test(event.target.value)
            return isValid
        }
    }

    const onChangeFormInputHandler = (event) => {
        const isValid = checkValidity(event)
        dispathAuth({type:'UPDATE',key:event.target.name,value:event.target.value,valid:isValid})
       
    }

    const onFocusInFormInputHandler = (event) => {
        dispathAuth({type:'MESSAGE',key:event.target.name,message:true})
    }

    const onFocusOutFormInputHandler = (event) => {
        dispathAuth({type:'MESSAGE',key:event.target.name,message:false})
    }

    return {authReducer,dispathAuth,onChangeFormInputHandler,onFocusInFormInputHandler,onFocusOutFormInputHandler}

}

export default useAuthForm