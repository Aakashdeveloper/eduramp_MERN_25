import './Header.css';
import {Link} from 'react-router-dom';
const Header = () => {
    return(
        <header>
            <div id="brand">
                Developer Funnel
                &nbsp; <Link to="/" className="btn btn-success">
                    Home
                </Link>
        
            </div>  
            <div id="social">
                <a href="#">
                    <img src="https://i.ibb.co/TTp516h/facebook.png" alt="fb"
                    className="socialIcon"/>
                </a>
                <a href="#">
                    <img src="https://i.ibb.co/w0kZ5Hf/insta.png" alt="fb"
                    className="socialIcon"/>
                </a>
                <a href="#">
                    <img src="https://i.ibb.co/4jxsYSP/yt3.png" alt="fb"
                    className="socialIcon"/>
                </a>
            </div>
        </header>
        

    )
}

export default Header