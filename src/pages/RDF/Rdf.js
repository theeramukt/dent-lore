import { useEffect, useState } from "react";
import "./Rdf.css";

const Rdf = () => {
  const [rdf, setRdf] = useState([]);
  
  useEffect(() => {
      fetch("http://127.0.0.1:8000/getrdf")
      .then((res) => {
          return res.json()
      })
      .then((data) => {
          setRdf(data)
      })}, [])

  return (
    <div className="rdfContainer">
      <div className="rdfFrame">
        <div className="rdf">{rdf}</div>
      </div>
      <div className="downloadButtonContainer">
        <a href="http://127.0.0.1:8000/downloadrdf_caries" className="downloadButton">
          Download
        </a>
      </div>
    </div>
  );
};

export default Rdf;
