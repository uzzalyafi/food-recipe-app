/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";


const MealCard = ({ meals }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mt-3">
      {meals.slice(0, 12).map((meal) => (
        <div
          key={meal.idMeal}
          className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Display meal image */}
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-56 object-cover rounded-t-lg"
          />

          <h2 className="text-xl font-bold mt-4">{meal.strMeal}</h2>

          <p className="text-gray-500 my-2 text-sm font-mono">
            Category: {meal.strCategory} | Cuisine: {meal.strArea}
          </p>

          <p className="mt-1 text-gray-800 text-base leading-5 font-medium font-sans ">
            {meal.strInstructions.substring(0, 70)}...
          </p>
          <NavLink to={`/Recipe/${meal.idMeal}`}>
            <button className="block w-full mt-4 px-6 py-2 bg-lime-500 rounded-sm text-white text-[20px] font-medium hover:bg-lime-700 duration-300 ">View</button>
          </NavLink>
          
        </div>
      ))}
    </div>
  );
};

export default MealCard;
