import "./Search.css"
import SearchIcon from "../../assets/Search.png"
import { useNavigate } from "react-router-dom";

export const Search = ({width, handleSearch, value, onChange}) => {

  return (
    <div className="input-wrapper">
    <img src={SearchIcon} id="search-icon" />
      <input placeholder="Type to search..." style={{width: width}} onChange={onChange}/>
    </div>
  );
};