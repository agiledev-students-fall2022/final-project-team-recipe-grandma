import React, { useState, useEffect } from "react";
// import "./Recipe.css";

function Recipe(props) {
  return (
    <article className="recipe">
      <h3>{props.details.ingredients}</h3>
      <h4>{props.details.steps}</h4>
      <img src={props.details.imageURL}></img>
    </article>
  );
}

module.exports = Recipe;