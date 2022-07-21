import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import classes from './SideDrawer.module.css'
import '../../App.css'

const SideDrawer = (props) => {
    const content = <CSSTransition mountOnEnter unmountOnExit timeout={200} classNames="sideDrawer" in={props.show}>
        <div className='sideDrawer'>

        </div>
    </CSSTransition>

    return (
        ReactDOM.createPortal(content,document.getElementById('sidedrawer_hook'))
    )
}

export default SideDrawer