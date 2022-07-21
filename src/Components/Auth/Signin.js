import React,{useState,useEffect} from 'react'
import Input from "../../FormElements/Input";
import Button from '../../FormElements/Button';
import authClasses from './Auth.module.css'
import classes from './Sign.module.css'
import useAuthForm from '../../Hooks/AuthHooks';
import useBackend from '../../Hooks/BackendHook';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login} from '../../Store/AuthStore'
import { useLocation } from 'react-router-dom';




const Signin = (props) => {

    const [error,setError] = useState({isError:false,errorMessage:''})
    const [next,setNext] = useState()

    const location = useLocation()

    const {authReducer,dispathAuth,onChangeFormInputHandler} = useAuthForm({email:{value:'',valid:true},password:{value:'',valid:true},valid:false})

    useEffect(() => {
      const url = new URL(window.location)
      const next = url.searchParams.get('next')
      if(next){
        setNext(next)
      }
    },[location])

    const dispatch = useDispatch()

    const {sendRequest} = useBackend()

    const navigate = useNavigate()
    
    const onSubmitSigninFormHandler = event => {
        event.preventDefault()
        setError({isError:false,errorMessage:''})
        const body = {
          email:authReducer.email.value,
          password:authReducer.password.value
        }
        sendRequest(`http://localhost:8000/authentication/login`,'POST',body)
        .then(respone => {
          console.log(respone.data)
          dispathAuth({type:'CLEAR'})
          localStorage.setItem('userInfo',JSON.stringify(respone.data))
          dispatch(login(respone.data))
          if(next){
            setNext()
            navigate(next)
          }
          else{
            navigate('/')
          }
          
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

    const signinForm = 
    <form className={authClasses.signInForm} onSubmit={onSubmitSigninFormHandler}>
      {error.isError && <p style={{margin:10,color:'red',textAlign:'center'}}>{error.errorMessage}</p>}
        <div style={{marginBottom:10}}>
          <Input type="email" elementType="input" name="email" onChangeHandler={(event) => onChangeFormInputHandler(event)} placeholder="E-mail ID"
            value={authReducer.email.value} valid={authReducer.email.valid}/>
          <Input type="password" elementType="input" name="password" onChangeHandler={(event) => onChangeFormInputHandler(event)} placeholder="Password"
            value={authReducer.password.value} valid={authReducer.password.valid}/>
        </div>
          <div className={authClasses.submitButton}>
            <Button type="submit" valid={authReducer.valid}>SIGN IN</Button>
          </div>
          <div className={classes.emailRsendParent}>
            <h5><Link to="/resendVEmail" className={classes.TextDeco}>Resend verification e-mail</Link></h5>
            <h5><Link to="/ForgotPassword" className={classes.TextDeco}>Forgot password?</Link></h5>
          </div>

          
    </form>
    
    return(
        <React.Fragment>
            {signinForm}
        </React.Fragment>
    )
}

export default Signin

