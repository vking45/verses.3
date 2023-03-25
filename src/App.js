import React from "react";
import { PolybaseProvider, AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import BNavbar from "./components/BNavbar";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Verse from "./components/Verse";
import Profile from "./components/Profile";
import Collection from "./components/Collection";
import Create from "./components/Create";
import Vform from "./components/Vform";
import Cform from "./components/Cform";


const polybase = new Polybase();
const auth = new Auth()

export const db = new Polybase({
  defaultNamespace: "pk/0xa2498ad8880112c293663bef40030ce209a4c48d5ab6c5057eb8a7a6b2b8e792d88cf756106040e5d1555a1bf5c57236ef3d9f7f5b76dfb90b735494e2c05837/verses.3",
});

function App() {
  return (
    <div className="App">
      <PolybaseProvider polybase={polybase}>
        <AuthProvider auth={auth} polybase={polybase}>
        <Router>
          <Header />
          <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/verse/:id" element={<Verse />} />
              <Route path="/profile/" element={<Profile />} />
              <Route path="/collections/" element={<Collection />} />
              <Route path="/create/" element={<Create />} />
              <Route path="/create/verse/" element={<Vform />} />
              <Route path="/create/collection/" element={<Cform />} />
          </Routes>
          <BNavbar />
        </Router>
        </AuthProvider>
      </PolybaseProvider>
    </div>
  );
}

export default App;
