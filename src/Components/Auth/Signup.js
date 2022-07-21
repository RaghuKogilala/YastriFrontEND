import React,{useState} from 'react'
import Input from "../../FormElements/Input";
import Button from '../../FormElements/Button'
import authClasses from './Auth.module.css'
import useAuthForm from '../../Hooks/AuthHooks';
import useBackend from '../../Hooks/BackendHook';
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {

   const [error,setError] = useState({isError:false,errorMessage:''})

   const {sendRequest} = useBackend()

   const navigate = useNavigate()

   const {authReducer,dispathAuth,onChangeFormInputHandler,onFocusInFormInputHandler,onFocusOutFormInputHandler} = useAuthForm({email:{value:'',valid:true,message:false},
                                                    name:{value:'',valid:true},
                                                    lastname:{value:'',valid:true},
                                                    password:{value:'',valid:true,message:false},
                                                    valid:false
                                                  })
    

    const onSubmitSignupHandler = event => {
      event.preventDefault()
      const body = {
        name:authReducer.name.value,
        email:authReducer.email.value,
        password:authReducer.password.value,
        lastname:authReducer.lastname.value
      }
      sendRequest(`http://localhost:8000/authentication/signup`,'POST',body)
      .then(respone => {
        dispathAuth({type:'CLEAR'})
        navigate('/Welcome')
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
    const signupForm = 
            <form className={authClasses.signInForm} onSubmit={onSubmitSignupHandler}>
              {error.isError && <p style={{margin:0,color:'red',textAlign:'center'}}>{error.errorMessage}</p>}
              <div style={{marginBottom:10}}>
                <Input type="text" elementType="input" onChangeHandler={(event) => {if(error.isError){setError({isError:false,errorMessage:''})}onChangeFormInputHandler(event)}} placeholder="FIRST NAME"
                  value={authReducer.name.value} name="name" valid ={authReducer.name.valid}/>
                <Input type="text" elementType="input" onChangeHandler={(event) => {if(error.isError){setError({isError:false,errorMessage:''})}onChangeFormInputHandler(event)}} placeholder="LAST NAME"
                  value={authReducer.lastname.value} name="lastname" valid={authReducer.lastname.valid}/>
                <Input type="email" elementType="input" onChangeHandler={(event) => {if(error.isError){setError({isError:false,errorMessage:''})}onChangeFormInputHandler(event)}} placeholder="E-MAIL ID"
                  value={authReducer.email.value} name="email" message={authReducer.email.message} onFocus ={onFocusInFormInputHandler} onBlur ={onFocusOutFormInputHandler} valid={authReducer.email.valid}/>
                <Input type="password" elementType="input" onChangeHandler={(event) => {if(error.isError){setError({isError:false,errorMessage:''})}onChangeFormInputHandler(event)}} placeholder="PASSWORD"
                  value={authReducer.password.value} name="password" message={authReducer.password.message} onFocus ={onFocusInFormInputHandler} onBlur ={onFocusOutFormInputHandler} valid={authReducer.password.valid}/>
              </div>
          <div className={authClasses.submitButton}>
            <Button type="submit" valid={authReducer.valid}>SIGN UP</Button>
          </div>
            </form>
        
        
    return(
      signupForm
    )
}

export default Signup