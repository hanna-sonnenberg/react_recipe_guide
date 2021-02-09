import React from 'react';
import App from '../App';
import '../App.css';
import '../Navbar.css';

const Navbar = ({getSearch, search, updateSearch}) => {
    return(
        <div className="navbar">
            <div className="logo-side">
                <h2>Recipe Guide</h2>
            </div>
            <form className = "search-form" onSubmit={getSearch}>
                <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Search by ingredients ..."/>
                <button className="search-button" type="submit">Search</button>
            </form>
        </div>
    );
}

export default Navbar;