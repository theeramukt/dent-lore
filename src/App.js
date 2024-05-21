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
import TripleManagement from "./pages/TripleManagement/TripleManagement";
import { useSelector } from "react-redux";

function App() {
  const password = localStorage.getItem('password')
  const passwordValue = useSelector((state) => state.login.passwordValue);

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
          {password && <Route path="/admin" element={<Admin />} />}
          {password && <Route path="/admin/triple-management" element={<TripleManagement />} />}
        </Routes>
      </div>
    </div>
  );
}

export default App;
