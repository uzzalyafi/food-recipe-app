/* eslint-disable no-unused-vars */
import { useState } from "react";
import MealCard from "./MealCard";
import bg_photo from "../assets/bg-photo.jpg";

const MainPage = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const FetchApi = async () => {
    if (search.trim() === "") {
      setError("Please enter a search term!");
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      const data = await response.json();

      if (data.meals) {
        setMeals(data.meals);
        setError("");
      } else {
        setMeals([]);
        setError("No meals found for your search!");
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
    }
  };

  return (
    <>
      <div
        style={{ backgroundImage: "url(" + bg_photo + ")",backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", maxWidth: "100%" }}
        className="container mx-auto py-3 bg-slate-200 min-h-screen "
      >
        <h1 className="md:ml-[350px] text-center md:text-left text-slate-50 text-3xl font-bold uppercase">
          Food Recipe App
        </h1>
        <div className="flex flex-col items-center justify-center mt-6 gap-3 ">
          <input
            onChange={handleInput}
            className="px-6 py-2 rounded-sm mr-2 w-[90%]  md:w-1/2"
            placeholder="Search Food Recipes"
            value={search}
          />
          <button
            onClick={FetchApi}
            className="px-6 py-2 bg-indigo-600 rounded-sm text-white text-[20px] font-medium hover:bg-indigo-700 duration-300"
          >
            Search
          </button>
        </div>

        {/* Display error  */}
        {error && (
          <p className="text-rose-950 text-center mt-10 text-2xl font-bold">
            {error}
          </p>
        )}

        <div>
          {/*  show MealCard  */}
          {meals.length > 0 ? (
            <MealCard meals={meals} />
          ) : (
            !error && (
              <p className="text-center mt-10 text-2xl font-bold">
                No meals to display
              </p>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
