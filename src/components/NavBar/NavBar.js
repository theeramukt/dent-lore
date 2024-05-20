import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom';
import home from '../../assets/Home.png'
import phone from '../../assets/Phone.png'
import { MdCloudUpload, MdAdminPanelSettings } from "react-icons/md";
import { IoHome } from "react-icons/io5"
import { RiEditFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import ModalLogin from '../Modal/ModalLogin/ModalLogin';
import { useState } from 'react';
import { setPasswordValue } from '../../redux/userSlice';


const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const passwordValue = useSelector((state) => state.login.passwordValue);
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [password, setPassword] = useState("")
  console.log("pass", passwordValue)
  const handleClick = () => {
    if (passwordValue == "ajarnart") {
      navigate("/admin")
    } else {
      setOpenLoginModal(true)
    }
  }
  const handleLogin = () => {
    fetch(`https://backend-dentlore.onrender.com/isAdmin?password=${password}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setOpenLoginModal(false)
          // dispatch(setPasswordValue(password))
          localStorage.setItem('password', password)
          navigate("/admin")
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("No data found");
        });
  }
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className='navButton'><IoHome size={23} color="#925e8f"/>Home</Link>
        </li>
        {/* <li>
          <Link to="/upload-file" className='navButton'><MdCloudUpload size={25}/>Upload</Link>
        </li> */}
        {/* <li>
          <Link to="/edit" className='navButton'><RiEditFill size={23}/>Edit</Link>
        </li> */}
        {/* <li>
          <Link to="/contact-us" className='navButton'><img src={phone} width={20}/>Contact Us</Link>
        </li> */}
        <li>
          <div className='navButton' onClick={handleClick}><MdAdminPanelSettings size={25} color="#925e8f"/>Admin</div>
        </li>
      </ul>
      {openLoginModal && <ModalLogin handleClickClose={() => setOpenLoginModal(false)} onChange={(e) => setPassword(e.target.value)} handleLogin={handleLogin} />}
    </nav>
  );
};

export default NavBar;
