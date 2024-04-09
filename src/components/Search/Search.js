import "./Search.css"
import SearchIcon from "../../assets/Search.png"
import { useNavigate } from "react-router-dom";

export const Search = ({width}) => {
  const navigate = useNavigate()
  
  const _handleKeydown = (e) => {
    if (e.key === "Enter") {
      navigate("./result")
      // console.log("Yes! I press Enter Key!!!")
    }
  }
  return (
    <div className="input-wrapper">
    <img src={SearchIcon} id="search-icon" />
      <input placeholder="Type to search..." onKeyDown={_handleKeydown} style={{width: width}}/>
    </div>
  );
};