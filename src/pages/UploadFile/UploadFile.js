import React, { useState } from "react";
import "./UploadFile.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFile } from "react-icons/ai";

const UploadFile = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("collection_name", title);
      formData.append("file", file);
      fetch(`https://backend-dentlore.onrender.com/add_data_from_csv?collection_name=${title}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  
  return (
    <div className="uploadPageContainer">
      <form>
        ชื่อเรื่อง
        <input
          type="text"
          className="inputTitle"
          placeholder="หัวข้อของเนื้อหา"
          onChange={(e) => setTitle(e.target.value)}
        />
        อัปโหลดไฟล์
        <div
          className="uploadFileContainer"
          onClick={() => document.querySelector(".input-field").click()}
        >
          <input
            type="file"
            accept=".csv"
            className="input-field"
            hidden
            onChange={({ target: { files } }) => {
              files[0] && setFileName(files[0].name);
              if (files) {
                setFile(files[0]);
              }
            }}
          />
          <MdCloudUpload size={50} color="#378CE7" />
          <p style={{ color: "#378CE7", fontWeight: "bold", fontSize: "12px" }}>CLICK!</p>
          <p style={{ margin: 0, fontSize: "12px" }}>to select a file from your computer</p>
        </div>
        {file ? (
          <div className="showFileContainer">
            <AiFillFile color="#378CE7"/>{" "}
            <span className="showFile">
              {fileName}
              <MdDelete
                onClick={() => {
                  setFile(null);
                  setFileName("No selected file");
                }}
              />
            </span>
          </div>
        ) : (
          <p className="fileType">File type: .csv</p>
        )}
        <button className="uploadButton" onClick={handleSubmit}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
