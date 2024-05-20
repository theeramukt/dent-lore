import "./App.css";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/ContactUs/ContactUs";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Result from "./pages/Result/Result";
import Rdf from "./pages/RDF/Rdf";
import UploadFile from "./pages/UploadFile/UploadFile";
import EditData from "./pages/EditData/EditData";
import Admin from "./pages/Admin/Admin";

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
          <Route path="/upload-file" element={<UploadFile />} />
          <Route path="/edit" element={<EditData />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
