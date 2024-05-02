import "./App.css";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Result from "./pages/Result/Result";
import Rdf from "./pages/RDF/Rdf";

function App() {

  return (
    <div className="App">
      <NavBar />
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/result" element={<Result />} />
          <Route path="/rdf" element={<Rdf />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
