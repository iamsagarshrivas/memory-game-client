import classes from "./Timer.module.css";
import React, { useState, useRef, useEffect } from "react";
import { toHHMMSS } from "../../utils/methods";

function Timer({ errorCount, startTimer, isTimerStarted }) {
  const [countdown, setCountdown] = useState(0);
  const timerId = useRef();

  useEffect(() => {
    if (isTimerStarted) {
      timerId.current = setInterval(() => {
        setCountdown((count) => count + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerId.current);
    };
  }, [isTimerStarted]);

  return (
    <div className={classes.timerContainer}>
      <div>Time: {toHHMMSS(countdown)}</div>
      <div>Errors: {errorCount}</div>
    </div>
  );
}

export default Timer;
