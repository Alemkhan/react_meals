import { useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";
import { useState } from "react/cjs/react.development";

const AvailableMeals = (props) => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(()=>{
        const fetchMeals = async () => {
            const response = await fetch('https://react-meals-4b3fe-default-rtdb.firebaseio.com/meals.json');
            
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }

            const data = await response.json();

            const loadedMeals = []

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                });
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });

    },[]);

    if (isLoading) {
        return <section className={classes.mealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if (httpError) {
        return <section className={classes.mealsError}>
            <p>{httpError}</p>
        </section>
    }

    const mealsList = meals.map(
        meal => 
        <MealItem 
            id={meal.id}
            key={meal.id} 
            name={meal.name} 
            description={meal.description}
            price={meal.price}
        />
    );
    
    return <section className={classes.meals}>
        <Card>
            <ul>{mealsList}</ul>
        </Card>
    </section>
}

export default AvailableMeals;