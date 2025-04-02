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
                <Link to="/register" className='btn btn-info'>
                    <span className="glyphicon glyphicon-user"></span> SignUp
                </Link> &nbsp;
                <Link to="/"  className='btn btn-success'>
                    <span className="glyphicon glyphicon-log-in"></span> LogIn
                </Link>
              
            </div>
        </header>
        

    )
}

export default Header