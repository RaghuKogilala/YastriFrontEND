import React, { useEffect,useState } from "react"
import { useLocation,Link,useNavigate } from "react-router-dom"
import useBackend from "../../Hooks/BackendHook"
import classes from '../Auth/VerifyUser.module.css'

const VerifyUser = (props) => {
    const [verified,setVerified] = useState('')
    const [error,setError] = useState({isError:false,errorMessage:''})
    const [redirect,setRedirect] = useState({link:'',message:''})
    const {sendRequest}  = useBackend()


    const navigate = useNavigate()


    const location = useLocation()

    useEffect(() => {
        
        const url = new URL(window.location)
        
        const token = url.searchParams.get('token')
        const email = url.searchParams.get('email')
        if(token && email){
            sendRequest(`http://localhost:8000/authentication/tokenverification/${email}/${token}`,'GET')
            .then(response => {
                navigate(`/NewPassword?email=${email}`)
            })
            .catch(err => {
                console.log(err)
                setRedirect({link:'/ForgotPassword',message:'Forgot Password'})
                if(err.response.data){
                  
                  setError({isError:true,errorMessage:err.response.data.message})
                  
                }
                else{
                  setError({isError:true,errorMessage:err.message})
                }
                
              })
        }
        else if(token){
            sendRequest(`http://localhost:8000/authentication/verify`,'GET',{},{authorization:`Bearer ${token}`})
            .then(response => {
                setVerified('Mail ID verified successfully, please login.')
            })
            .catch(err => {
              setRedirect({link:'/resendVEmail',message:'Resend Verification Email'})
                if(err.response.data){
                  setError({isError:true,errorMessage:err.response.data.message})
                  
                }
                else{
                  setError({isError:true,errorMessage:err.message})
                }
                
              })
        }
        else{
            navigate('/resendconfirmation')
        }
        
    },[location,navigate,sendRequest])

    return(
        <React.Fragment>
          <div className={classes.VUTextAlignment}>
            {error.isError && <React.Fragment><p style={{color:'red'}}>{error.errorMessage}</p>
            <p><Link to={redirect.link}>{redirect.message}</Link></p>
            </React.Fragment>}
            {!error.isError && verified.length === 0 && <p>User Verification In progress, Please Wait</p>}
            {!error.isError && verified.length !==0 && <p>{verified}</p>}
          </div>
        </React.Fragment>
    )
}

export default VerifyUser

//{error.isError && <React.Fragment><p style={{margin:0,color:'red',textAlign:'center'}}>{error.errorMessage}</p> line 69