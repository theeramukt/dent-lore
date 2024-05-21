import "./Admin.css";
import ModalDelete from "../../components/Modal/ModalDelete/ModalDelete";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import ModalUpload from "../../components/Modal/ModalUpload/ModalUpload";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const adminPassword = localStorage.getItem("password");
  const navigate = useNavigate()
  const [collection, setCollection] = useState([]);
  const [openDeleteTopicModal, setOpenDeleteTopicModal] = useState(false);
  const [openAddTopicModal, setOpenAddTopicModal] = useState(false);
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

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

  const handleEditPage = (data) => {
    localStorage.setItem('topicEdit', data)
    navigate("./triple-management")
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
              <button
                className="editTopicButton"
                onClick={() => handleEditPage(data)}
              >
              <MdEdit size="20px" color="#ffffff" />
                Edit Data
              </button>
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
    </div>
  );
};

export default Admin;
