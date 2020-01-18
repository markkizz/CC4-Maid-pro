import React, { Component } from "react";
import "./App.css";
import BookingCard from '../src/components/BookingCard/BookingCard'
export class App extends Component {
  render() {
    return <div className="App">
      <BookingCard />
    </div>;
  }
}

export default App;
