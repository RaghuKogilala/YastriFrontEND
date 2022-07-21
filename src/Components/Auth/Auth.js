import React, {useState} from 'react'
import Login from './Signin'
import Signup from './Signup'
import classes from './Auth.module.css'


const Auth = (props) => {
    const [isLogin,setIsLogin] = useState(true)
    

    const onClickToggleLogin = () => {
        setIsLogin(true)
    }

    const onClickToggleSignup = () => {
        setIsLogin(false)
    }

    const toogleLogin = (switchLogin) => {
        onClickToggleLogin()
    }
    
    return(
        <React.Fragment>
            <div className={classes.authParent}>
                <div className={classes.authModel}>
                    <p onClick={onClickToggleLogin} className={`${classes.headerStyles}  ${isLogin && classes.activeClass}` }>Sign in</p>
                    <p onClick={onClickToggleSignup} className={`${classes.headerStyles} ${!isLogin && classes.activeClass}`}>Sign up</p>
                </div>
                {isLogin && <Login isLogin={isLogin} />}
                {!isLogin && <Signup isLogin={isLogin}  toogleLogin={toogleLogin}/>}
            </div>
            
            
        </React.Fragment>
    )
    
}

export default Auth