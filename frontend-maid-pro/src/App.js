import React, { Component } from "react";
import "./App.css";
import MyBookingHistory from "./pages/MyBookingHistory/MyBookingHistory";

export class App extends Component {
  render() {
    return <div className="App">
      <MyBookingHistory />
    </div>;
  }
}

export default App;
