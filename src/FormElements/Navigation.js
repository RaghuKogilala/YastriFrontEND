import React,{ useState ,useEffect} from 'react'
import classes from './Navigation.module.css'
import Backdrop from './Backdrop/Backdrop'
import SideDrawer from './SideDrawer/SideDrawer'
import { useSelector,useDispatch } from 'react-redux'
import {logout} from '../Store/AuthStore'
import {useNavigate,useLocation} from 'react-router-dom'

const Navigation = (props) => {
    const [toogleSideDrawer,setToogleSideDrawer] = useState(false)
    const [showdropDown,setShowdropDown] = useState(false)
    const username = useSelector(state => state.auth.username)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')
        if(!userInfo){
            navigate(`/auth?next=${location.pathname}`)
        }
    },[location])

    const onToggleSideDrawerHandler = () => {
        setToogleSideDrawer((prevState) => {
            return !prevState
        })
    }
    const onClickLogoutUserHandler = () => {
        dispatch(logout())
        localStorage.removeItem('userInfo')
        navigate('/auth')
    }
    return(
        <React.Fragment>
            {toogleSideDrawer && <Backdrop  onClose={onToggleSideDrawerHandler}/>}
            <SideDrawer show={toogleSideDrawer} />
            <nav className={classes.navBar}>
                <div className={classes.navBarDropdown} onClick={onToggleSideDrawerHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className={classes.userInfo} onMouseEnter={() => setShowdropDown(true)} onMouseLeave={() => setShowdropDown(false)}>
                    <p>Hi, {username}</p>
                    {showdropDown && <div className={classes.userDesc}>
                        <p style={{textAlign:'center', margin:10}} className={classes.Signout}>Account</p> 
                        <p style={{textAlign:'center', margin:10}} className={classes.Signout} onClick = {onClickLogoutUserHandler}>Sign Out</p>
                    </div>}
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Navigation