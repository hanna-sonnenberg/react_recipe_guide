import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import Navbar from './Navbar';
import './App.css';
import '../index.css';

// create App component

const App = () => {
  // Authentification
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
  const API_KEY_TWO = process.env.REACT_APP_SPOONACULAR_2_API_KEY;

  // set states
  const [recipes, setRecipe] = useState([]);
  // create state for the search
  const [search, setSearch] = useState('');
  // only fetch data after user clicks on search button
  const [query, setQuery] = useState('pumpkin');
  const [recipeUrls, setRecipeUrls] = useState({});

  useEffect(() => {
    // console.log('Effect has been run');
    // run the function getRecipes to fetch the data from the Api
    getRecipes();
  }, [query]);

  const getRecipeInformationBulk = async (recipeIds) => {
    try {
      // sends request
      // https://api.spoonacular.com/recipes/informationBulk?ids=715538,716429
      const response = await fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY_TWO}&ids=${recipeIds}&includeNutrition=false`);
      // handles response if successful
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      // handles response if unseccessful
      throw new Error('Request failed');
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // fetch Recipe Informations
  const getRecipes = async () => {
    if (query === '') {
      return;
    }
    try {
      // sends request
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY_TWO}&ingredients=${query}`);
      // handles response if successful
      if (response.ok) {
        const data = await response.json();
        // Code to execute with data

        const recipeIds = data.map(recipe => recipe.id).join();
        const recipeInfos =  await getRecipeInformationBulk(recipeIds);
        // const recipeInfos =  await Promise.all(data.map(recipe => getRecipeInformation(recipe.id)));
        console.log(recipeInfos);

        const recipeUrls = {};
        recipeInfos.forEach(recipeInfo => {
          recipeUrls[recipeInfo.id] = recipeInfo.sourceUrl;
        });

        setRecipeUrls(recipeUrls);

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
      <Navbar
        getSearch = {getSearch}
        search = {search}
        updateSearch = {updateSearch}
      />
      {recipes.map(recipe => {
        const url = recipeUrls[recipe.id];
        return (<Recipe 
          // Solution to the error: Each child in a list should have a unique "key" prop.
          key = {recipe.title}
          // props to display data fetched from API in Recipe Component
          title = {recipe.title}
          image = {recipe.image}
          ingredients = {recipe.missedIngredients}
          url = {url}
        />);
      })}
    </div>
  );
};

export default App;
