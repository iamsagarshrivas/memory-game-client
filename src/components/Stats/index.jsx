import classes from "./Stats.module.css";
import React from "react";
import { toHHMMSS } from "../../utils/methods";

function Stats({ errorCount, timeElapsed }) {
  return (
    <div className={classes.statsContainer}>
      <h2>GAME OVER</h2>
      <h4>Error Count: {errorCount}</h4>
      <h4>Time Elapsed: {toHHMMSS(parseInt(timeElapsed / 1000))}</h4>
    </div>
  );
}

export default Stats;
