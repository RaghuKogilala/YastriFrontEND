import classes from '../Auth/Information.module.css'

const Information = (props) => {
    return(
        <div className={classes.TextAlignment}>
            <p>{props.message}</p>
        </div>
    )
}

export default Information