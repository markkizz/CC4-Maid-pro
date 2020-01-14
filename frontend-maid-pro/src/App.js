import React, { Component } from "react";
import "./App.css";
import ModalSearch from "./components/ModalSearch/ModalSearch";
export class App extends Component {
  render() {
    return (
      <div className="App">
        <ModalSearch />
      </div>
    );
  }
}

export default App;
