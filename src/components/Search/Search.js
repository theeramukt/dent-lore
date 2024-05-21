import "./Search.css"
import SearchIcon from "../../assets/Search.png"

export const Search = ({width, onChange, placeholder}) => {

  return (
    <div className="input-wrapper">
    <img src={SearchIcon} id="search-icon" alt=""/>
      <input placeholder={placeholder ? placeholder : "Type to search..."} style={{width: width}} onChange={onChange}/>
    </div>
  );
};