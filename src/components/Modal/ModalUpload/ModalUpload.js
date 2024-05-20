import React from 'react'
import './ModalUpload.css'
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFile } from "react-icons/ai";

const ModalUpload = ({ handleClickClose, handleSubmit, onChangeTitle, onChangeFile, file, fileName, onClickDelete }) => {
  return (
    <div className="modalBackground">
      <div className="modalUploadContainer">
        <button className="closeButton" onClick={handleClickClose}>
          x
        </button>
        <form>
        ชื่อเรื่อง
        <input
          type="text"
          className="inputTitle"
          placeholder="หัวข้อของเนื้อหา"
          onChange={onChangeTitle}
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
            onChange={onChangeFile}
          />
          <MdCloudUpload size={50} color="#925e8f" />
          <p style={{ color: "#925e8f", fontWeight: "bold", fontSize: "12px" }}>CLICK!</p>
          <p style={{ margin: 0, fontSize: "12px" }}>to select a file from your computer</p>
        </div>
        {file ? (
          <div className="showFileContainer">
            <AiFillFile color="#925e8f"/>{" "}
            <span className="showFile">
              {fileName}
              <MdDelete
              onClick={onClickDelete}
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
    </div>
  )
}

export default ModalUpload