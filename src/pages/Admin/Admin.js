import DataTable from "react-data-table-component";
import { Search } from "../../components/Search/Search";
import "./Admin.css";
import ModalDelete from "../../components/Modal/ModalDelete/ModalDelete";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdDownload } from "react-icons/io"
import ModalEdit from "../../components/Modal/ModalEdit/ModalEdit";
import ModalUpload from "../../components/Modal/ModalUpload/ModalUpload";
import ModalAddTriple from "../../components/Modal/ModalAddTriple/ModalAddTriple";
import { useSelector } from "react-redux";

const Admin = () => {
  const passwordValue = useSelector((state) => state.login.passwordValue);
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
  const [allEdge, setAllEdge] = useState([])
  const [addTripleTopic, setAddTripleTopic] = useState("")
  const [addTripleHead, setAddTripleHead] = useState("")
  const [addTripleRelation, setAddTripleRelation] = useState("")
  const [addTripleTail, setAddTripleTail] = useState("")
  const [search, setSearch] = useState("tooth")
  const [dataFilter, setDataFilter] = useState([])
  const [tripleDelete, setTripleDelete] = useState([])
  console.log("file", file);

  console.log("tripleDelete", tripleDelete)

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
    fetch(
      `https://backend-dentlore.onrender.com/getedge_search?q=tooth`
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
  }, []);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      // formData.append("collection_name", title);
      formData.append("file", file);
      fetch(
        `https://backend-dentlore.onrender.com/add_data_from_csv?collection_name=${title}&password=${passwordValue}`,
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
      `https://backend-dentlore.onrender.com/delete_topic?collection_name=${topic}&password=${passwordValue}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setOpenDeleteTopicModal(false);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddTriple = () => {
    fetch(
        `https://backend-dentlore.onrender.com/add_data?topic=${addTripleTopic}&head=${addTripleHead}&relation=${addTripleRelation}&tail=${addTripleTail}&password=${passwordValue}`,
        {
          method: "POST"
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

  const handleTripleDelete = () => {
    fetch(
        `https://backend-dentlore.onrender.com/delete_data?head=${tripleDelete.from}&relation=${tripleDelete.label}&tail=${tripleDelete.to}&password=${passwordValue}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setOpenDeleteTripleModal(false);
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }

  useEffect(() => {
    const nodesFilter = allEdge.filter((data) => (data.from.toLowerCase().includes(search.toLowerCase()) || data.to.toLowerCase().includes(search.toLowerCase()) || data.label.includes(search.toLowerCase())));
    setDataFilter(nodesFilter);
}, [search]);

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
              <a className="downloadTopicButton" href={`https://backend-dentlore.onrender.com/downloadCsv?topic=${data}`}>
              <IoMdDownload size={20}/>
                CSV
              </a>
              <a className="downloadTopicButton" href={`https://backend-dentlore.onrender.com/downloadrdf?topic=${data}`}>
              <IoMdDownload size={20}/>
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
          <Search width={400} onChange={(e) => setSearch(e.target.value)}/>
          <button className="tripleSearchButton">search</button>
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
              {dataFilter.map((data) => (<tr>
                <td>{data.from}</td>
                <td>{data.label}</td>
                <td>{data.to}</td>
                <td>
                  <div className="actionsContainer">
                    <button
                      className="editTripleButton"
                      onClick={() => setOpenEditTripleModal(true)}
                    >
                      <MdEdit size="20px" color="#ffffff" />
                    </button>
                    <button className="deleteTripleButton" onClick={() => (setOpenDeleteTripleModal(true), setTripleDelete(data))}>
                      <MdDelete size="20px" color="#ffffff" />
                    </button>
                  </div>
                </td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>

      {openAddTopicModal && (
        <ModalUpload
          handleClickClose={() => setOpenAddTopicModal(false)}
          onChangeTitle={(e) => setTitle(e.target.value)}
          onChangeFile={({ target: { files } }) => {
            console.log("files", files);
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
        <ModalEdit
          handleClickClose={() => setOpenEditTripleModal(false)}
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
