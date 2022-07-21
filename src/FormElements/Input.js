import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {
  
    let inputDisplay
    switch(props.elementType){
        case 'input':
            inputDisplay = <div style={{position:"relative"}}><input type={props.type} placeholder={props.placeholder} 
            className={`${!props.valid && classes.InputError} ${props.className} ${classes.Input} `} onChange={props.onChangeHandler} value={props.value} 
            id={props.id} onBlur={props.onBlur} onFocus={props.onFocus} {...props} />
            {props.type === "password" && props.message && <div className={classes.info} >Password must have at least 6 characters with:
                    <ul>
                        <li>At least one upper case[A-Z]</li>
                        <li>At least one lower case[a-z]</li>
                        <li>At least one number[0-9]</li>
                        <li>At least one special character[!@#$%_]</li>
                    </ul>
                    </div>}
            {props.type === "email" && props.message && <div className={classes.Emailinfo} >Please enter a valid email ID for email verification purpose.
                    </div>}
            </div>
            break;
        case 'select':
            inputDisplay = <select></select>
            break;
        default:
            inputDisplay = <input />

    }
    return(
        <div className={classes.Inputparent}>
            {inputDisplay}
        </div>
    )
}

export default Input