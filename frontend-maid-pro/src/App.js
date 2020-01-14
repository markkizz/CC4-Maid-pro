import React, { Component } from "react";
import "./App.css";
import ReviewCard from "./components/ReviewCard/ReviewCard";
export class App extends Component {
  render() {
    return (
      <div className="App">
        <ReviewCard />
      </div>
    );
  }
}

export default App;
