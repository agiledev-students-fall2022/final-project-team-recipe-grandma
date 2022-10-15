import React, { useState, useEffect } from "react";
import axios from "axios"
// import * as React from 'react';
import logo from './logo.svg';
import Recipe from "./Recipe";
import './App.css';

function App(){
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios( // found a recipe database with ingredients + cooking steps
                                  // but it gives me an error message
                                  // "If this is valid SVG, it's probably a bug in svg-parser."
        "https://raw.githubusercontent.com/raywenderlich/recipes/master/Recipes.json"
      );
      setData(result.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Recommended Recipes</h1>
      <section className="recipes">
        {data.map((item) => (
          <Recipe key={item.name} details={item} />
        ))}
      </section>
    </>
  );
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
}

export default App;
