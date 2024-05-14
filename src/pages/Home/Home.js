import NavBar from "../../components/NavBar/NavBar";
import { Search } from "../../components/Search/Search";
import Logo from "../../assets/Logo.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/userSlice";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchValue = useSelector((state) => state.search.searchValue);
  console.log("search", searchValue);
  const [search, setSearch] = useState("")
  const handleClick = (e) => {
    e.preventDefault()
    dispatch(setSearchValue(search))
    navigate("/result")
  }

  return (
    <div className="homeContainer">
      <img src={Logo} id="logo" />
      <Search width={400} onChange={(e) => setSearch(e.target.value)}/>
      <button className="search" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default Home;
