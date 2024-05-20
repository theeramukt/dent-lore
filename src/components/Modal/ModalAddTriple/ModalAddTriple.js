import React from "react";
import "./ModalAddTriple.css";

const ModalAddTriple = ({ handleClickClose, topic, handleHead, handleRelation, handleTail, handleTopic, handleAddTriple }) => {
  return (
    <div className="modalBackground">
      <div className="modalAddTripleContainer">
        <button className="closeButton" onClick={handleClickClose}>
          x
        </button>
        <div className="formContainer">
          <div className="">
            <p className="inputAddTitle">Topic</p>
            <select className="select" onChange={handleTopic}>
            <option>select topic</option>
              {topic.map((data) => (
                <option>{data}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="inputAddTitle">Head</p>
            <div className="inputData"><input placeholder="head" className="input" onChange={handleHead}/></div>
          </div>
          <div>
            <p className="inputAddTitle">Relation</p>
            <div className="inputData"><input placeholder="relation" className="input" onChange={handleRelation}/></div>
          </div>
          <div>
            <p className="inputAddTitle">Tail</p>
            <div className="inputData"><input placeholder="tail" className="input" onChange={handleTail}/></div>
          </div>
          <div className="buttonContainer">
            <button className="addTripleButton" onClick={handleAddTriple}>
              Add Triple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddTriple;
