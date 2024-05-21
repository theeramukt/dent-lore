import React, { useEffect, useState } from "react";
import { Search } from "../../components/Search/Search";
import ModalAddTriple from "../../components/Modal/ModalAddTriple/ModalAddTriple";
import ModalEdit from "../../components/Modal/ModalEdit/ModalEdit";
import ModalDelete from "../../components/Modal/ModalDelete/ModalDelete";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TripleManagement = () => {
  const adminPassword = localStorage.getItem("password");
  const topicEdit = localStorage.getItem("topicEdit");
  const navigate = useNavigate()
  const [collection, setCollection] = useState([]);
  const [openEditTripleModal, setOpenEditTripleModal] = useState(false);
  const [openAddTripleModal, setOpenAddTripleModal] = useState(false);
  const [openDeleteTripleModal, setOpenDeleteTripleModal] = useState(false);
  const [allEdge, setAllEdge] = useState([]);
  const [addTripleTopic, setAddTripleTopic] = useState("");
  const [addTripleHead, setAddTripleHead] = useState("");
  const [addTripleRelation, setAddTripleRelation] = useState("");
  const [addTripleTail, setAddTripleTail] = useState("");
  const [search, setSearch] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const [tripleDelete, setTripleDelete] = useState([]);
  const [oldHead, setOldHead] = useState("");
  const [oldRelation, setOldRelation] = useState("");
  const [oldTail, setOldTail] = useState("");
  const [newHead, setNewHead] = useState(oldHead);
  const [newRelation, setNewRelation] = useState(oldRelation);
  const [newTail, setNewTail] = useState(oldTail);

  useEffect(() => {
    fetch(`https://backend-dentlore.onrender.com/collections`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCollection(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("No data found");
      });
  }, []);

  useEffect(() => {
    fetch(`https://backend-dentlore.onrender.com/getEdit?topic=${topicEdit}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllEdge(data);
        setDataFilter(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("No data found");
        navigate("/admin")
      });
  }, []);

  const handleAddTriple = () => {
    if (
      addTripleHead === "" ||
      addTripleRelation === "" ||
      addTripleTail === ""
    ) {
      alert("Please fill all the fields");
    } else if (addTripleTopic === "") {
      alert("Please select the topic");
    } else {
      fetch(
        `https://backend-dentlore.onrender.com/add_data?topic=${addTripleTopic}&head=${addTripleHead}&relation=${addTripleRelation}&tail=${addTripleTail}&password=${adminPassword}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setOpenAddTripleModal(false);
          fetch(
            `https://backend-dentlore.onrender.com/getEdit?topic=${topicEdit}`
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setAllEdge(data);
              setDataFilter(data);
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("No data found");
            });
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleTripleDelete = () => {
    fetch(
      `https://backend-dentlore.onrender.com/delete_data?head=${tripleDelete.from}&relation=${tripleDelete.label}&tail=${tripleDelete.to}&password=${adminPassword}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOpenDeleteTripleModal(false);
        fetch(
          `https://backend-dentlore.onrender.com/getEdit?topic=${topicEdit}`
        )
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setAllEdge(data);
            setDataFilter(data);
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("No data found");
          });
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEditTriple = () => {
    if (
      oldHead === newHead &&
      oldRelation === newRelation &&
      oldTail === newTail
    ) {
      alert("Please enter data");
    } else {
      fetch(
        `https://backend-dentlore.onrender.com/update_data?old_h=${oldHead}&old_r=${oldRelation}&old_t=${oldTail}&new_h=${newHead}&new_r=${newRelation}&new_t=${newTail}&password=${adminPassword}`,
        {
          method: "PUT",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setOpenEditTripleModal(false);
          fetch(
            `https://backend-dentlore.onrender.com/getEdit?topic=${topicEdit}`
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setAllEdge(data);
              setDataFilter(data);
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("No data found");
            });
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Sorry, something went wrong.\nPlease try again later");
        });
    }
  };

  useEffect(() => {
    const nodesFilter = allEdge.filter(
      (data) =>
        data.label.toLowerCase().includes(search.toLowerCase()) ||
        data.from.toLowerCase().includes(search.toLowerCase()) ||
        data.to.toLowerCase().includes(search.toLowerCase())
    );
    setDataFilter(nodesFilter);
  }, [search]);

  return (
    <div className="adminContainer">
      <div className="tripleContainer">
        <h1 className="title">Triples Data</h1>
        <div className="tripleSearch">
          <div className="searchTripleContainer">
            <Search
              width={400}
              placeholder={`type to search ${topicEdit}'s triple...`}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="addNewTripleButton"
            onClick={() => setOpenAddTripleModal(true)}
          >
            Add New Triple
          </button>
        </div>
        <div className="tableWrapper">
          <table className="table">
            <thead>
              <tr>
                <th className="expand">HEAD</th>
                <th className="expand">RELATION</th>
                <th className="expand">TAIL</th>
                <th className="expand">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {dataFilter.message !== "not found"
                ? dataFilter.map((data) => (
                    <tr>
                      <td>{data.from}</td>
                      <td>{data.label}</td>
                      <td>{data.to}</td>
                      <td>
                        <div className="actionsContainer">
                          <button
                            className="editTripleButton"
                            onClick={() => (
                              setOpenEditTripleModal(true),
                              setOldHead(data.from),
                              setOldRelation(data.label),
                              setOldTail(data.to),
                              setNewHead(data.from),
                              setNewRelation(data.label),
                              setNewTail(data.to)
                            )}
                          >
                            <MdEdit size="20px" color="#ffffff" />
                          </button>
                          <button
                            className="deleteTripleButton"
                            onClick={() => (
                              setOpenDeleteTripleModal(true),
                              setTripleDelete(data)
                            )}
                          >
                            <MdDelete size="20px" color="#ffffff" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : (alert("Not found"), setDataFilter(allEdge))}
            </tbody>
          </table>
        </div>
      </div>

      {openAddTripleModal && (
        <ModalAddTriple
          handleClickClose={() => setOpenAddTripleModal(false)}
          topic={collection}
          handleTopic={(e) => setAddTripleTopic(e.target.value)}
          handleHead={(e) => setAddTripleHead(e.target.value)}
          handleRelation={(e) => setAddTripleRelation(e.target.value)}
          handleTail={(e) => setAddTripleTail(e.target.value)}
          handleAddTriple={handleAddTriple}
        />
      )}
      {openEditTripleModal && (
        <ModalEdit
          handleClickClose={() => setOpenEditTripleModal(false)}
          oldHead={oldHead}
          oldRelation={oldRelation}
          oldTail={oldTail}
          onChangeHead={(e) =>
            setNewHead(e.target.value === "" ? oldHead : e.target.value)
          }
          onChangeRelation={(e) =>
            setNewRelation(e.target.value === "" ? oldRelation : e.target.value)
          }
          onChangeTail={(e) =>
            setNewTail(e.target.value === "" ? oldTail : e.target.value)
          }
          handleSubmit={handleEditTriple}
        />
      )}
      {openDeleteTripleModal && (
        <ModalDelete
          handleClickClose={() => setOpenDeleteTripleModal(false)}
          handleClickDelete={handleTripleDelete}
        />
      )}
    </div>
  );
};

export default TripleManagement;
