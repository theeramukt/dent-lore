import React from "react";
import "./ModalEdit.css";

const ModalEdit = ({
  handleClickClose,
  handleSubmit,
  oldHead,
  oldRelation,
  oldTail,
  onChangeHead,
  onChangeRelation,
  onChangeTail,
}) => {
  return (
    <div className="modalBackground">
      <div className="modalEditContainer">
        <div className="header">
          <p>Edit Triple</p>
          <button className="closeButton" onClick={handleClickClose}>
            x
          </button>
        </div>
        <div className="inputDataContainer">
          <div className="inputEditTitle">Head</div>
          <div className="inputContainer">
            <input
              className="input"
              placeholder={oldHead}
              onChange={onChangeHead}
            />
          </div>
        </div>
        <div className="inputDataContainer">
          <div className="inputEditTitle">Relation</div>
          <div className="inputContainer">
            <input
              className="input"
              placeholder={oldRelation}
              onChange={onChangeRelation}
            />
          </div>
        </div>
        <div className="inputDataContainer">
          <div className="inputEditTitle">Tail</div>
          <div className="inputContainer">
            <input
              className="input"
              placeholder={oldTail}
              onChange={onChangeTail}
            />
          </div>
        </div>
        <div className="buttonContainer">
          <button className="submitButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
