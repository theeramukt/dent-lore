import './NavBar.css'
import { Link } from 'react-router-dom';
import home from '../../assets/Home.png'
import phone from '../../assets/Phone.png'
import { MdCloudUpload } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className='navButton'><img src={home} width={23} style={{marginBottom: 3}}/>Home</Link>
        </li>
        <li>
          <Link to="/upload-file" className='navButton'><MdCloudUpload size={25}/>Upload</Link>
        </li>
        {/* <li>
          <Link to="/edit" className='navButton'><RiEditFill size={23}/>Edit</Link>
        </li> */}
        <li>
          <Link to="/contact-us" className='navButton'><img src={phone} width={20}/>Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
