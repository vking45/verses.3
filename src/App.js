import React from "react";
import BNavbar from "./components/BNavbar";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Verse from "./components/Verse";

function App() {
  return (
    <div className="App">
      <Header />
      <Verse />
      <BNavbar />
    </div>
  );
}

export default App;
