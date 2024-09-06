import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // fetch by id
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data.meals[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      });
  }, [id]);

  // back page
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        Recipe not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4" style={{backgroundImage: `url(${recipe.strMealThumb})`}}>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Recipe Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-center">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-96 object-cover lg:rounded-l-lg"
            />
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="hidden md:block mt-8 px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition "
            >
              Go Back
            </button>
          </div>

          {/* Recipe Info */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {recipe.strMeal}
            </h1>

            <div className="text-gray-600 mb-4">
              <span className="block mb-2">
                <strong>Category:</strong> {recipe.strCategory}
              </span>
              <span className="block">
                <strong>Area:</strong> {recipe.strArea}
              </span>
            </div>

            {/* Instructions */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Instructions
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {recipe.strInstructions}
            </p>

            {/* Ingredients */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Ingredients
            </h2>
            <ul className="text-gray-600 space-y-1">
              {Object.keys(recipe)
                .filter((key) => key.includes("Ingredient") && recipe[key])
                .map((key, index) => (
                  <li key={index}>
                    {recipe[key]} - {recipe[`strMeasure${key.match(/\d+/)}`]}
                  </li>
                ))}
            </ul>
             {/* Back Button */}
             <button
              onClick={handleBack}
              className="block md:hidden mt-8 px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-700 transition "
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;
