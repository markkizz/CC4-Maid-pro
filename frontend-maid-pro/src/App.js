import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar"
import BookingCard from "./components/BookingCard/BookingCard"
import Footer from "./components/Footer/Footer"

export class App extends Component {
  render() {
    return <div className="App">
      <Navbar />
      <BookingCard />
      <Footer />
    </div>;
  }
}

export default App;
