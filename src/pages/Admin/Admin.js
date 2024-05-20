import DataTable from "react-data-table-component";
import { Search } from "../../components/Search/Search";
import "./Admin.css";
import ModalDelete from "../../components/Modal/ModalDelete/ModalDelete";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import ModalEdit from "../../components/Modal/ModalEdit/ModalEdit";
import ModalUpload from "../../components/Modal/ModalUpload/ModalUpload";
import ModalAddTriple from "../../components/Modal/ModalAddTriple/ModalAddTriple";
import { useSelector } from "react-redux";

const Admin = () => {
  const adminPassword = localStorage.getItem("password");
  const [collection, setCollection] = useState([]);
  const [openDeleteTopicModal, setOpenDeleteTopicModal] = useState(false);
  const [openEditTripleModal, setOpenEditTripleModal] = useState(false);
  const [openAddTripleModal, setOpenAddTripleModal] = useState(false);
  const [openDeleteTripleModal, setOpenDeleteTripleModal] = useState(false);
  const [openAddTopicModal, setOpenAddTopicModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [allEdge, setAllEdge] = useState([]);
  const [addTripleTopic, setAddTripleTopic] = useState("");
  const [addTripleHead, setAddTripleHead] = useState("");
  const [addTripleRelation, setAddTripleRelation] = useState("");
  const [addTripleTail, setAddTripleTail] = useState("");
  const [search, setSearch] = useState("tooth");
  const [dataFilter, setDataFilter] = useState([]);
  const [tripleDelete, setTripleDelete] = useState([]);
  const [oldHead, setOldHead] = useState("");
  const [oldRelation, setOldRelation] = useState("");
  const [oldTail, setOldTail] = useState("");
  const [newHead, setNewHead] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const [newTail, setNewTail] = useState("");

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
    fetch(`https://backend-dentlore.onrender.com/getedge_search?q=tooth`)
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
  }, []);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fetch(
        `https://backend-dentlore.onrender.com/add_data_from_csv?collection_name=${title}&password=${adminPassword}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleTopicDelete = () => {
    fetch(
      `https://backend-dentlore.onrender.com/delete_topic?collection_name=${topic}&password=${adminPassword}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOpenDeleteTopicModal(false);
        window.location.reload();
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddTriple = () => {
    fetch(
      `https://backend-dentlore.onrender.com/add_data?topic=${addTripleTopic}&head=${addTripleHead}&relation=${addTripleRelation}&tail=${addTripleTail}&password=${adminPassword}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOpenAddTripleModal(false);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        window.location.reload()
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = () => {
    if (search != "") {
      fetch(
        `https://backend-dentlore.onrender.com/getedgeSearch?node=${search}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDataFilter(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setDataFilter(allEdge);
        });
    } else {
      fetch(`https://backend-dentlore.onrender.com/getedge_search?q=tooth`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDataFilter(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("No data found");
        });
    }
  };

  const handleEditTriple = () => {
    if (newHead == ""){
        setNewHead(oldHead)
    }
    if (newRelation == ""){
        setNewRelation(oldRelation)
    }
    if (newTail == ""){
        setNewTail(oldTail)
    }
    fetch(
        `https://backend-dentlore.onrender.com/update_data?old_h=${oldHead}&old_r=${oldRelation}&old_t=${oldTail}&new_h=${newHead}&new_r=${newRelation}&new_t=${newTail}&password=${adminPassword}`, {
            method: "PUT",
          }
      )
      .then((response) => response.json())
      .then((data) => {
        setOpenEditTripleModal(false)
        window.location.reload()
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Please fill all the fields");
      });
  }

  return (
    <div className="adminContainer">
      <div className="topicContainer">
        <div className="topicHeader">
          <h1 className="title">Topics</h1>
          <button
            className="addTopic"
            onClick={() => setOpenAddTopicModal(true)}
          >
            Add New Topic
          </button>
        </div>
        {collection.map((data) => (
          <div className="topic">
            <div>{data}</div>
            <div className="buttonTopicContainer">
              <a
                className="downloadTopicButton"
                href={`https://backend-dentlore.onrender.com/downloadCsv?topic=${data}`}
              >
                <IoMdDownload size={20} />
                CSV
              </a>
              <a
                className="downloadTopicButton"
                href={`https://backend-dentlore.onrender.com/downloadrdf?topic=${data}`}
              >
                <IoMdDownload size={20} />
                RDF
              </a>
              <button
                className="deleteTopicButton"
                onClick={(e) => (setOpenDeleteTopicModal(true), setTopic(data))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="tripleContainer">
        <h1 className="title">Triples Data</h1>
        <div className="tripleSearch">
          <div className="searchTripleContainer">
            <Search width={400} onChange={(e) => setSearch(e.target.value)} />
            <button className="tripleSearchButton" onClick={handleSearch}>
              search
            </button>
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
              {dataFilter.message != "not found"
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
                              setOldTail(data.to)
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

      {openAddTopicModal && (
        <ModalUpload
          handleClickClose={() => setOpenAddTopicModal(false)}
          onChangeTitle={(e) => setTitle(e.target.value)}
          onChangeFile={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setFile(files[0]);
            }
          }}
          file={file}
          fileName={fileName}
          onClickDelete={() => {
            setFile(null);
            setFileName("No selected file");
          }}
          handleSubmit={handleUpload}
        />
      )}
      {openDeleteTopicModal && (
        <ModalDelete
          handleClickClose={() => setOpenDeleteTopicModal(false)}
          handleClickDelete={handleTopicDelete}
        />
      )}
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
        <ModalEdit handleClickClose={() => setOpenEditTripleModal(false)} 
            oldHead={oldHead}
            oldRelation={oldRelation}
            oldTail={oldTail}
            onChangeHead={(e) => setNewHead(e.target.value)}
            onChangeRelation={(e) => setNewRelation(e.target.value)}
            onChangeTail={(e) => setNewTail(e.target.value)}
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

export default Admin;
