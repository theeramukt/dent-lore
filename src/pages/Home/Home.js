import NavBar from "../../components/NavBar/NavBar";
import { Search } from "../../components/Search/Search";
import Logo from "../../assets/Logo.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
  const handleClick = () => {
    navigate("./result")
  };
  return (
    <div className="homeContainer">
      <img src={Logo} id="logo" />
      <Search width={400}/>
      <button className="search" onClick={() => handleClick()}>
        Search
      </button>
    </div>
  );
};

export default Home;
