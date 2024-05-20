import React from 'react'
import './ModalEdit.css'

const ModalEdit = ({ handleClickClose, handleSubmit}) => {
  return (
    <div className="modalBackground">
      <div className="modalEditContainer">
        <button className="closeButton" onClick={handleClickClose}>
          x
        </button>
        <div>
            <div>Head</div>
            <input placeholder='Beetlejuice'/>
        </div>
        <div>
            <div>Relation</div>
            <input placeholder='released'/>
        </div>
        <div>
            <div>Tail</div>
            <input placeholder='1988'/>
        </div>
        <div className="buttonContainer">
          <button className="deleteButton" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ModalEdit