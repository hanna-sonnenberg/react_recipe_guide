import React from 'react';

// component Recipe takes the props
const Recipe = ({title, image, ingredients}) => {
   
    return(
        <div>
            <h1>{title}</h1>
            <img src={image} alt=""/>
            <h5>Ingredients</h5>
            <ul></ul>          
        </div>
    )

}

export default Recipe;
