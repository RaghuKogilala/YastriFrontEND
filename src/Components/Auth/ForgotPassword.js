import React, { useState } from "react";
import authClasses from './Auth.module.css'
import Input from "../../FormElements/Input";
import Button from "../../FormElements/Button";
import useAuthForm from "../../Hooks/AuthHooks";
import useBackend from "../../Hooks/BackendHook";
import classes from "./ForgotPassword.module.css"


const ForgotPassword = (props) => {
    const [error,setError] = useState({isError:false,errorMessage:''})
    const [message,setMessage] = useState('')

    const {authReducer,dispathAuth,onChangeFormInputHandler} = useAuthForm({email:{value:'',valid:true}})


    const {sendRequest} = useBackend()

    const onSubmitForgotPasswordFormHandler = (event) => {
        event.preventDefault()
        setMessage('')
        
          sendRequest(`http://localhost:8000/authentication/reset/${authReducer.email.value}`,'GET')
          .then(respone => {
            setMessage(respone.data.message)
            dispathAuth({type:'CLEAR'})
          })
          .catch(err => {
            
            if(err.response.data){
              setError({isError:true,errorMessage:err.response.data.message})
              
            }
            else{
              setError({isError:true,errorMessage:err.message})
            }
            
          })
        
    }

    const ForgotPasswordForm = <form className={classes.FPForm} onSubmit={onSubmitForgotPasswordFormHandler}>
        {error.isError && <p style={{margin:'10px 0',color:'red',textAlign:'center'}}>{error.errorMessage}</p>}
        {message.length !== 0 && <p style={{textAlign:'center',margin:'10px 0'}}>{message}</p>}
        <div className={classes.FPHeading}>
          <h3>Forgot Password</h3>
          <p>Please enter your registered email:</p>
        </div>
        <div style={{marginBottom:10}}>
          <Input type="email" elementType="input" name="email" onChangeHandler={(event) => {if(error.isError){setError({isError:false,errorMessage:''})}onChangeFormInputHandler(event)}} placeholder="EMAIL ID"
            value={authReducer.email.value} valid={authReducer.email.valid}/>
        </div>
        <div className={authClasses.submitButton}>
            <Button type="submit" valid={authReducer.valid}>CONTINUE</Button>
        </div>
    </form>

    return(
        <React.Fragment>
        {ForgotPasswordForm}
        </React.Fragment>
    )
}

export default ForgotPassword