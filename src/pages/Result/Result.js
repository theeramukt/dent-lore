import VisComponent from "../../components/Graph/VisComponent";
import { Search } from "../../components/Search/Search";
import "./Result.css";
import graph from "../../assets/graph_5.PNG";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/searchSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.searchValue);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [search, setSearch] = useState("a");
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(search));
  };
  const handleNavigate = () => {
    navigate("/edit");
  };
  useEffect(() => {
      fetch(`https://backend-dentlore.onrender.com/getnode_search?q=${searchValue}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setNodes(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("No data found");
        });
        
  }, [searchValue]);

  useEffect(() => {
    fetch(`https://backend-dentlore.onrender.com/getedge_search?q=${searchValue}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEdges(data);
      });
  }, [searchValue]);
  return (
    <div className="resultContainer">
      <div className="leftContainer">
        <div className="searchContainer">
          <Search width={165} onChange={(e) => setSearch(e.target.value)} />
          <button className="searchButtonResult" onClick={handleClick}>
            Search
          </button>
        </div>
        <div className="entitiesContainer">
          {nodes.map((data) => (
            <div className="entity">{data.label}</div>
          ))}
        </div>
      </div>
      <div className="graphContainer">
        <div className="graph">
          <VisComponent nodes={nodes} edges={edges} />
        </div>
        <div className="navigateButtonContainer">
          {/* <button className="navigateButton" onClick={() => {handleNavigate()}}>
            RDF
          </button> */}
          {/* <button className="navigateButton" onClick={() => {handleNavigate()}}>
            Edit
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Result;
