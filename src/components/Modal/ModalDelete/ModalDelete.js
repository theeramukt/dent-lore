import React from "react";
import "./ModalDelete.css";
import { IoIosCloseCircle } from "react-icons/io";

const ModalDelete = ({ handleClickClose, handleClickDelete }) => {
  return (
    <div className="modalBackground">
      <div className="modalDeleteContainer">
        <button className="closeButton" onClick={handleClickClose}>
          x
        </button>
        <div className="crossIcon">
          <IoIosCloseCircle size={90} color="#DC3545" />
        </div>
        <h1>Are you sure?</h1>
        <div>
          <p>Do you really want to delete this?</p>
          <p>after deleting you can't undone</p>
        </div>
        <div className="buttonContainer">
          <button className="cancelButton" onClick={handleClickClose}>Cancel</button>
          <button className="deleteButton" onClick={handleClickDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
