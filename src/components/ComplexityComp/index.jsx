import React from "react";
import classes from "./ComplexityComp.module.css";

function ComplexityComponent({ onComplexityChange }) {
  return (
    <div className={classes.mainContainer}>
      <h3>Please Select Game Difficulty</h3>

      <div className={classes.buttonContainer}>
        <button type="button" onClick={() => onComplexityChange("easy")}>
          Easy
        </button>
        <button type="button" onClick={() => onComplexityChange("medium")}>
          Medium
        </button>
        <button type="button" onClick={() => onComplexityChange("hard")}>
          Hard
        </button>
      </div>
    </div>
  );
}

export default ComplexityComponent;
