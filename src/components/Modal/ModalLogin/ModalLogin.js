import React from 'react'
import './ModalLogin.css'

const ModalLogin = ({ handleClickClose, handleLogin, onChange }) => {
  return (
    <div className="modalBackground">
      <div className="modalLoginContainer">
        <button className="closeButton" onClick={handleClickClose}>
          x
        </button>
        <h1 className='loginTitle'>Welcome Back!</h1>
        <div className='loginSubTitle'>
          please enter your password to login
        </div>
        <div className='passwordInput'><input placeholder='password' onChange={onChange}/></div>
        <div className="buttonContainer">
          <button className="loginButton" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default ModalLogin