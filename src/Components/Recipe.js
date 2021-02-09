import React from 'react';
import './Recipe.css';

// component Recipe takes the props
const Recipe = ({title, image, ingredients, url}) => {
   
    return(
        <div className="cards-container">
            <div className="cards">
                <h1>{title}</h1>
                <img src={image} alt=""/>
                <h5>Ingredients</h5>
                <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient.original}>{ingredient.original}</li>
                ))} 
                </ul>
                <a href={url}>Go to Recipe</a>        
            </div>
        </div>
    )

}

export default Recipe;
