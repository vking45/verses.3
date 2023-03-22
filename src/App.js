import React from "react";
import BNavbar from "./components/BNavbar";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Verse from "./components/Verse";
import Profile from "./components/Profile";
import Collection from "./components/Collection";

function App() {
  return (
    <div className="App">
      <Header />
      <Collection />
      <BNavbar />
    </div>
  );
}

export default App;
