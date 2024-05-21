import { Search } from "../../components/Search/Search";
import Logo from "../../assets/Logo.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/searchSlice";

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")
  const handleClick = (e) => {
    e.preventDefault()
    dispatch(setSearchValue(search))
    navigate("/result")
  }

  return (
    <div className="homeContainer">
      <img src={Logo} id="logo" alt=""/>
      <div className="description">
        <p style={{fontSize: 20, fontWeight: 'bold', margin: 0}}>Hello,</p>
        <p style={{fontSize: 16, margin: 0}}>I'm a Knowledge Graph on dental diseases that can assist you in understanding the connections between various disease-related facts.</p>

        <p>You can enter information into the box below to search for it.</p>
      </div>
      <Search width={400} onChange={(e) => setSearch(e.target.value)}/>
      <button className="search" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default Home;
