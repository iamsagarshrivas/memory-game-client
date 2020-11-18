import React, { useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import PlayArea from "./components/PlayArea";
import ComplexityComp from "./components/ComplexityComp";
import Stats from "./components/Stats";
import axios from "./utils/axios";

function App({ history }) {
  const [gameConfig, setGameConfig] = useState("");
  const [stats, setStats] = useState({});

  function handleComplexityChange(complexity) {
    axios
      .post("/generate-game", { complexity })
      .then((res) => {
        setGameConfig(res);
        history.push("/play");
      })
      .catch(console.error);
  }

  function handleGameOver(data) {
    setStats(data);
    history.push("/game-over");
  }

  return (
    <Switch>
      <Route path="/play">
        <PlayArea {...gameConfig} onGameOver={handleGameOver} />
      </Route>
      <Route path="/game-over">
        <Stats {...stats} />
      </Route>
      <Route path="/">
        <ComplexityComp onComplexityChange={handleComplexityChange} />
      </Route>
    </Switch>
  );
}

export default withRouter(App);
