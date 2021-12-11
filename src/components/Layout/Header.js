import HeaderCartButton from "./HeaderCartButton";

import mealsImage from "../../assets/meals.jpg"
import classes from "./Header.module.css"

const Header = (props) => {
    return <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onCartShow} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="Table with food" />
        </div>
    </>
};

export default Header;