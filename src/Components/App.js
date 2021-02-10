import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Recipe from './Recipe';
import Navbar from './Navbar';
import findByIngredients from '../Mocks/findByIngredients';
import informationBulk from '../Mocks/informationBulk';
import './App.css';
import '../index.css';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const API_KEY_TWO = process.env.REACT_APP_SPOONACULAR_2_API_KEY;

const api = axios.create({
  baseURL: 'https://api.spoonacular.com/',
  timeout: 1000,
  params: {
    apiKey: API_KEY_TWO,
  }
});

const mock = new MockAdapter(api);
mock.onGet("recipes/findByIngredients").reply(200, findByIngredients);
mock.onGet("recipes/informationBulk").reply(200, informationBulk);


// create App component

const App = () => {
  // Authentification
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
      const response = await api.get('recipes/informationBulk', {
        params: {
          ids: recipeIds,
          includeNutritions: false,
        }
      });
      const data = response.data;
      return data;
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
      const response = await api.get('recipes/findByIngredients', {
        params: {
          ingredients: query,
        }
      });
      const { data } = response;

      const recipeIds = data.map(recipe => recipe.id).join();
      const recipeInfos =  await getRecipeInformationBulk(recipeIds);
      console.log(recipeInfos);

      const recipeUrls = {};
      recipeInfos.forEach(recipeInfo => {
        recipeUrls[recipeInfo.id] = recipeInfo.sourceUrl;
      });

      setRecipeUrls(recipeUrls);

      setRecipe(data);
      console.log(data);
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
      <div className="recipe-cards-container">
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
    </div>
  );
};

export default App;
