import React, { useEffect, useState } from "react";
import "./EditData.css";
import { useSelector } from "react-redux";
import { Search } from "../../components/Search/Search";

const EditData = () => {
  const searchValue = useSelector((state) => state.search.searchValue);
    const [oldHead, setOldHead] = useState("");
    const [newHead, setNewHead] = useState("");
    const [oldRelation, setOldRelation] = useState("");
    const [newRelation, setNewRelation] = useState("");
    const [oldTail, setOldTail] = useState("");
    const [newTail, setNewTail] = useState("");
    const [search, setSearch] = useState("");
    const [nodesFilter, setNodesFilter] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  useEffect(() => {
    fetch(
      `https://backend-dentlore.onrender.com/getnode_search?q=${searchValue}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setNodes(data);
        setNodesFilter(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("No data found");
      });
  }, [searchValue]);

  const selectData = (e) => {
    fetch(
        `https://backend-dentlore.onrender.com/getedgeSearch?node=${e.target.innerText}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setEdges(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("No data found");
        });
  };

  const handleEdit = (e) => {
    fetch(
        `https://backend-dentlore.onrender.com/update_data?old_h=${oldHead}&old_r=${oldRelation}&old_t=${oldTail}&new_h=${newHead}&new_r=${newRelation}&new_t=${newTail}`, {
            method: "PUT",
          }
      )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Please fill all the fields");
      });
  }

  const handleHead = (oldData, newData) => {
    setOldHead(oldData);
    setNewHead(newData);
  }
  const handleRelation = (oldData, newData) => {
    setOldRelation(oldData);
    setNewRelation(newData);
  }
  const handleTail = (oldData, newData) => {
    setOldTail(oldData);
    setNewTail(newData);
  }

useEffect(() => {
    const nodesFilter = nodes.filter((data) => (data.label.includes(search)));
    setNodesFilter(nodesFilter);
}, [search]);
  return (
    <div className="resultContainer">
      <div className="leftContainer">
        <div className="searchContainer">
          <Search width={230} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="entitiesContainer">
          {nodesFilter.map((data) => (
            <div className="entity" onClick={selectData}>
              {data.label}
            </div>
          ))}
        </div>
      </div>
      <div className="editsContainer">
      <div style={{padding: 10, margin: 0, fontSize: 20, fontWeight: 'bold'}}>Edit Triples</div>
        {edges.map((data) => (
          <div className="editContainer">
            <div className="edit">
              <input type="text" className="inputEdit" placeholder={data.from} onChange={(e) => {handleHead(data.from, e.target.value)}}/>
              <input type="text" className="inputEdit" placeholder={data.label} onChange={(e) => {handleRelation(data.label, e.target.value)}}/>
              <input type="text" className="inputEdit" placeholder={data.to} onChange={(e) => {handleTail(data.to, e.target.value)}}/>
              <button className="editButton" onClick={handleEdit}>Confirm</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditData;
