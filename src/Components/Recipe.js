import React from 'react';
import './Recipe.css';

// component Recipe takes the props
const Recipe = ({title, image, ingredients, url}) => {
   
    return(
        <div className="cards-container">
            <div className="recipe-card">
                <h3 className="recipe-title">{title}</h3>
                <img src={image} alt=""/>
                <h4 className="ingredients-text">Ingredients</h4>
                <ul className="ingredients-list">
                {ingredients.map(ingredient => (
                    <li key={ingredient.original}>{ingredient.original}</li>
                ))} 
                </ul>
                <a href={url} className="recipe-btn">Go to Recipe</a>        
            </div>
        </div>
    )
}

export default Recipe;
