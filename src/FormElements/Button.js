import React from 'react'
import classes from './Button.module.css'

const Button = props => {
    return(
        <button className={`${classes.Button} ${props.className}`} disabled={!props.valid} onClick={props.onClickButton} type={props.type}>{props.children}</button>
    )
}

export default Button