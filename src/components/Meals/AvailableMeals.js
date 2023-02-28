import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../customHooks/useHttp';

const AvailableMeals = () => {
  const [DUMMY_MEALS, setDummyMeals] = useState([]);
  const {isLoading, error, sendRequest: getMeals} = useHttp();
  
  useEffect(() => {
    getMeals({url: 'https://food-order-app-57817-default-rtdb.firebaseio.com/meals.json'}, formatData);
  
    const mealsArr = [];

    function formatData(mealsObj) {
      for (const key in mealsObj) {
        mealsArr.push ({
          id: key,
          name: mealsObj[key].name,
          description: mealsObj[key].description,
          price: mealsObj[key].price
        });
      }
    };

    setDummyMeals(mealsArr);
  }, [getMeals]);

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <ul>{mealsList}</ul>}
        {!isLoading && error && <p>Error {error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
