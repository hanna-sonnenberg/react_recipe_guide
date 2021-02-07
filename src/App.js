import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';
import './index.css';

// create App component

const App = () => {
  // Authentification
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  const [recipes, setRecipe] = useState([]);

  // API Request example search recipes by ingredients
  // const exampleReq = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2';
  useEffect(() => {
    // console.log('Effect has been run');
    // run the function getRecipes to fetch the data from the Api
    getRecipes();
  }, []);

  // function that handles the Get Request
  const getRecipes = async () => {
    try {
      // sends request
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=apples,+flour,+sugar&number=2`);
      // handles response if successful
      if (response.ok) {
        const data = await response.json();
        // Code to execute with data
        setRecipe(data);
        console.log(data);
        return;
      }
      // handles response if unseccessful
      throw new Error('Request failed');
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div className="App">
      <form className = "search-form">
        <input className="search-bar" type="text"/>
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe =>(
        < Recipe 
          // Solution to the error: Each child in a list should have a unique "key" prop.
          key = {recipe.title}
          // props to display data fetched from API in Recipe Component
          title = {recipe.title}
          image = {recipe.image}
          ingredients = { recipe.missedIngredients.forEach(function(key) {
            console.log(key.name);
          }) }
        />
      ))}
    </div>
  );
};

export default App;
