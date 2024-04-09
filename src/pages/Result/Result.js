import VisComponent from "../../components/Graph/VisComponent";
import { Search } from "../../components/Search/Search";
import "./Result.css";

const Result = () => {
  const nodes = [
    { id: 1, value: 2, label: "Algie" },
    { id: 2, value: 31, label: "Dental caries" },
    { id: 3, value: 12, label: "common disease" },
    { id: 4, value: 16, label: "the mouth" },
    { id: 5, value: 17, label: "the entire body" },
    { id: 6, value: 15, label: "radiology" },
    { id: 7, value: 6, label: "tools" },
    { id: 8, value: 5, label: "the basics" },
    { id: 9, value: 30, label: "caries" },
    { id: 10, value: 18, label: "radiographs" },
  ];
  
  const edges = [
    { from: 1, to: 2, label: "middle"},
    { from: 1, to: 3, label: "top"},
    { from: 2, to: 4, label: "horizontal"},
    { from: 2, to: 5, label: "bottom"},
  ];

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
        <VisComponent nodes={nodes} edges={edges} />
      </div>
    </div>
  );
};

export default Result;
