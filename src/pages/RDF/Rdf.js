import { useEffect, useState } from "react";
import { Search } from "../../components/Search/Search";
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
    <div className="resultContainer">
      <div className="leftContainer">
        <div className="searchContainer">
          <Search width={165} />
          <button className="searchButtonResult">Search</button>
        </div>
        <div className="entitiesContainer">
          {/* {nodes.map((data) => (
            <div className="entity">{data.label}</div>
          ))} */}
        </div>
      </div>
      <div className="rdfContainer">
        <div className="rdf">{rdf}</div>
      </div>
    </div>
  );
};

export default Rdf;
