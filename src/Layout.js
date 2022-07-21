import React,{useEffect} from 'react'
import {Route,Routes, useNavigate} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import ResendVerifyEmail from './Components/Auth/RVerifyemail'
import VerifyUser from './Components/Auth/VerifyUser'
import ForgotPassword from './Components/Auth/ForgotPassword'
import NewPassword from './Components/Auth/NewPassword'
import Information from './Components/Auth/Information'
import Home from './Components/Home/Home'

// const NewPassword = React.lazy(() => import('./Components/Auth/NewPassword'))

const Layout = props => {
    

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const navigate = useNavigate()
    // useEffect(() => {
    //     if(!userInfo){
    //         navigate('/auth')
    //     }
        
    // },[userInfo,navigate])

    

    return(
        <Routes>
            <Route path='/auth'  element={<Auth />}/>
            <Route index element= {<Home />} />
            <Route path='/resendVEmail'  element={<ResendVerifyEmail/>}/>
            <Route path='/verifyuser' element={<VerifyUser />} />
            <Route path='/ForgotPassword' element={<ForgotPassword />} />
            <Route path='/NewPassword' element={<NewPassword />} />
            <Route path="/Welcome" element={<Information message="Thanks for signing up, we've sent a verification link e-mail to your mail ID. Please verify."/>} />
            <Route path="/resendconfirmation" element={<Information message="The mail has been sent to your registered email. Please verify"/>} />
            <Route path="/passwordchangeconfirmation" element={<Information message="Your password has been changed successfully. Please login"/>} />
        </Routes>
    )
}

export default Layout