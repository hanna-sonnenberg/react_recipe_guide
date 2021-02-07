import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';
import './index.css';

// create App component

const App = () => {
  // Authentification
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

  // set states
  const [recipes, setRecipe] = useState([]);
  // create state for the search
  const [search, setSearch] = useState('');
  // only fetch data after user clicks on search button
  const [query, setQuery] = useState('pumpkin');

  useEffect(() => {
    // console.log('Effect has been run');
    // run the function getRecipes to fetch the data from the Api
    getRecipes();
  }, [query]);

  // function that handles the Get Request
  const getRecipes = async () => {
    if (query === '') {
      return;
    }
    try {
      // sends request
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${query}`);
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
  };

  // everytime user runs onChange the event runs
  const updateSearch = (event) => {
    // setSearch to the value 'search'
    setSearch(event.target.value);
    // console.log(search);
  };

  const getSearch = (event) => {
    event.preventDefault(); // stop page refresh
    setQuery(search);
    setSearch('');
  };

  return(
    <div className="App">
      <form className = "search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe =>(
        < Recipe 
          // Solution to the error: Each child in a list should have a unique "key" prop.
          key = {recipe.title}
          // props to display data fetched from API in Recipe Component
          title = {recipe.title}
          image = {recipe.image}
          ingredients = {recipe.missedIngredients}
        />
      ))}
    </div>
  );
};

export default App;
