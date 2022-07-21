import React,{useState} from 'react'
import Input from "../../FormElements/Input";
import Button from '../../FormElements/Button';
import useAuthForm from '../../Hooks/AuthHooks';
import useBackend from '../../Hooks/BackendHook';
import classes from './RVerifyemail.module.css'
import authClasses from './Auth.module.css'
import { useNavigate } from 'react-router-dom';


const ResendVerifyEmail = (props) =>{

  const [error,setError] = useState({isError:false,errorMessage:''})

  const [message,setMessage] = useState('')

  const {authReducer,dispathAuth,onChangeFormInputHandler} = useAuthForm({email:{value:'',valid:true}})

  const {sendRequest} = useBackend()
  const navigate = useNavigate()

  const onSubmitResendVerifyFormHandler = event => {
    event.preventDefault()
    setMessage('')
    setError({isError:false,errorMessage:''})
    sendRequest(`http://localhost:8000/authentication/resendverificationmail/${authReducer.email.value}`,'GET')
      .then(respone => {
        setMessage(respone.data.message)
        dispathAuth({type:'CLEAR'})
        // navigate('/')
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

    const resendVEmailForm = 
    <form className={classes.RVerifyForm} onSubmit={onSubmitResendVerifyFormHandler}>
      {error.isError && <p style={{margin:0,color:'red',textAlign:'center'}}>{error.errorMessage}</p>}
      {message.length !== 0 && <p style={{textAlign:'center',margin:'10px 0'}}>{message}</p>}
      <div className={classes.RVerifyHeading}>
        <h3>Resend Verification e-mail</h3>
        <p>Please enter your registered email:</p>
      </div>
      <div style={{marginBottom:10}}>
        <Input type="email" elementType="input" name="email" onChangeHandler={(event) => onChangeFormInputHandler(event)} placeholder="E-mail ID"
          value={authReducer.email.value} valid={authReducer.email.valid}/>
      </div>
          <div className={authClasses.submitButton}>
            <Button type="submit" valid={authReducer.valid}>CONTINUE</Button>
          </div>
          
    </form>
    
    return(
        <React.Fragment>
            {resendVEmailForm}
        </React.Fragment>
    )

}

export default ResendVerifyEmail