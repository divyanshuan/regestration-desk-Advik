import React from "react";
import "./App.css";
import Battleground from "./Components/battleground/battleground";
import Event from "./Components/event/event";

const App = () => {
  return (
    <div className="main">
      <Event />
      <Battleground />
    </div>
  );
};

export default App;
