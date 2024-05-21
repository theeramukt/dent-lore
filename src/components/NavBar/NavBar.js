import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ModalLogin from "../Modal/ModalLogin/ModalLogin";
import { useState } from "react";
import { setPasswordValue } from "../../redux/userSlice";
import Logo from "../../assets/Logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordValue = useSelector((state) => state.login.passwordValue);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [password, setPassword] = useState("");
  const adminPassword = localStorage.getItem("password");
  
  const handleClick = () => {
    if (passwordValue === "ajarnart" || adminPassword === "ajarnart") {
      window.location.reload();
      navigate("/admin");
    } else {
      setOpenLoginModal(true);
    }
  };
  const handleLogin = () => {
    fetch(`https://backend-dentlore.onrender.com/isAdmin?password=${password}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOpenLoginModal(false);
        dispatch(setPasswordValue(password));
        localStorage.setItem("password", password);
        navigate("/admin");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("No data found");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("password");
    navigate("/");
    window.location.reload()
  };
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className="navButton">
            <img src={Logo} width={150} alt="" />
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/" className="navButton">
            <IoHome size={23} color="#925e8f" />
            Home
          </Link>
        </li>
        <li>
          <div className="navButton" onClick={handleClick}>
            <MdAdminPanelSettings size={25} color="#925e8f" />
            Admin
          </div>
        </li>
        {adminPassword && (
          <li>
            <button onClick={handleLogout} className="logout">
              Log out
            </button>
          </li>
        )}
      </ul>
      {openLoginModal && (
        <ModalLogin
          handleClickClose={() => setOpenLoginModal(false)}
          onChange={(e) => setPassword(e.target.value)}
          handleLogin={handleLogin}
        />
      )}
    </nav>
  );
};

export default NavBar;
