import React, { useState,useEffect } from "react";
import useAuthForm from "../../Hooks/AuthHooks";
import useBackend from "../../Hooks/BackendHook";
import authClasses from './Auth.module.css'
import { useLocation,useNavigate } from "react-router-dom";
import Input from "../../FormElements/Input";
import Button from "../../FormElements/Button";
import classes from "./NewPassword.module.css"


const NewPassword = props => {
    const location = useLocation()
    const [error,setError] = useState({isError:false,errorMessage:''})
    const [userEmail,setUserEmail] = useState('')
    const [Message,setMessage] = useState('')

    const navigate = useNavigate()

    const {authReducer,dispathAuth,onChangeFormInputHandler,onFocusInFormInputHandler,onFocusOutFormInputHandler} = useAuthForm({password:{value:'',valid:true},confirmPassword:{value:'',valid:true},valid:false})

    const {sendRequest} = useBackend()

    useEffect(() => {
        const url = new URL(window.location)
        const email = url.searchParams.get('email')
        if(email){
            setUserEmail(email)
            setMessage('')
        }
        else{
            setUserEmail('')
            setMessage('Email not Found, Please click on the link and request for mail to change password')
        }
    },[location])

    const onSubmitNewPasswordFormFormHandler = (event) => {
        event.preventDefault()
        const body = {
            email:userEmail,
            password:authReducer.password.value,
            confirmPassword:authReducer.confirmPassword.value
        }
        sendRequest(`http://localhost:8000/authentication/forgotpassword`,'POST',body)
        .then(respone => {
            navigate('/')
          dispathAuth({type:'CLEAR'})
          navigate('/passwordchangeconfirmation')
        })
        .catch(err => {
          console.log(err)
          if(err.response.data){
            setError({isError:true,errorMessage:err.response.data.message})
            
          }
          else{
            setError({isError:true,errorMessage:err.message})
          }
          
        })
    }

    const newPasswordForm = 
    
        <React.Fragment>
            {Message.length !== 0 && <p style={{textAlign:'center'}}>{Message}</p>}
        
         {Message.length === 0 && <form className={classes.NewPasswordForm} onSubmit={onSubmitNewPasswordFormFormHandler}>
         
      {error.isError && <p style={{color:'red'}}>{error.errorMessage}</p>}
      <div style={{marginBottom:10}}>
        <Input type="password" elementType="input" name="password" onChangeHandler={(event) => onChangeFormInputHandler(event)} placeholder="PASSWORD"
          value={authReducer.password.value} message={authReducer.password.message} onFocus ={onFocusInFormInputHandler} onBlur ={onFocusOutFormInputHandler} valid={authReducer.password.valid}/>
        <Input type="password" elementType="input" name="confirmPassword" onChangeHandler={(event) => onChangeFormInputHandler(event)} placeholder="CONFIRM PASSWORD"
          value={authReducer.confirmPassword.value} valid={authReducer.confirmPassword.valid}/>
      </div>
          <div className={authClasses.submitButton}>
            <Button type="submit" valid={authReducer.valid}>Change Password</Button>
          </div>
    </form>}
    </React.Fragment>
    
    
    return(
        <React.Fragment>
            {newPasswordForm}
        </React.Fragment>
    )

}

export default NewPassword