import React from 'react';
import App from './App';
import './App';
import './Navbar.css';

const Navbar = ({getSearch, search, updateSearch}) => {
    return(
        <div className="navbar">
            <div className="logo-side">
                <h1 className="logo-text">Recipe Guide</h1>
            </div>
            <form className = "search-form" onSubmit={getSearch}>
                <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Search by ingredients ..."/>
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
}

export default Navbar;