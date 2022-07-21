import ReactDOM from 'react-dom'
import classes from './Backdrop.module.css'

const Backdrop = props => {
    return(
        ReactDOM.createPortal(<div className={classes.backdrop} onClick={props.onClose}></div>,document.getElementById('backdrop_hook'))
    )
}

export default Backdrop