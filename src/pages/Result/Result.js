import VisComponent from "../../components/Graph/VisComponent";
import { Search } from "../../components/Search/Search";
import "./Result.css";
import graph from "../../assets/graph_5.PNG";
import { useEffect, useState } from "react";
// import nodes from "../../data/node.js";
// import edges from "../../data/edge.js";

const Result = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/getnode")
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      setNodes(data)
    })
  }, [])
  useEffect(() => {
    fetch("http://127.0.0.1:8000/getedge")
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      setEdges(data)
    })
  }, [])
  return (
    <div className="resultContainer">
      <div className="leftContainer">
        <div className="searchContainer">
          <Search width={165} />
          <button className="searchButtonResult">Search</button>
        </div>
        <div className="entitiesContainer">
          {nodes.map((data) => (
            <div className="entity">{data.label}</div>
          ))}
        </div>
      </div>
      <div className="graph">
        {/* <img src={graph} width={550} className="graphPic"/> */}
        <VisComponent nodes={nodes} edges={edges} />
      </div>
    </div>
  );
};

export default Result;
