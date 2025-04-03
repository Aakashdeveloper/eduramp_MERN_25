import {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useLogout from './useLogout'

const baseUrl = process.env.REACT_APP_API_URL;

const Profile = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState();
    const logout = useLogout()

    const userData = async() => {
        const response = await fetch(`${baseUrl}/userinfo`,{
            method:'GET',
            headers:{
                'x-access-token':sessionStorage.getItem('ltk')
            }
        })

        const data = await response.json();
        setUser(data)
    }

    const renderUser = (data) => {
        if(data){
            sessionStorage.setItem('rtk',data.role);
            return(
                <>
                    <h1>Hi {data.name}</h1>
                    <h2>Your Email Id is {data.email}</h2>
                    <h2>Your Phone Number is {data.phone}</h2>
                    <h2>Your role is {data.role}</h2>
                </>
            )
        }
    }

    useEffect(() => {
        userData()
    },[])

    const conditionalRender = (data) => {
        if(data){
            if(data?.role?.toLowerCase() === "admin"){
                return(
                    <Link to="/userList" className='btn btn-success'>
                        Users
                    </Link>
                )
            }
        }
    }

    if(sessionStorage.getItem('ltk') === null){
        navigate('/')
    }else{
        return(
            <>
                <hr/>
                <div className='panel panel-primary'>
                    <div className='panel-heading'>
                        <h3>Profile</h3>
                    </div>
                    <div className='panel-body'>
                        {renderUser(user)}
                        {conditionalRender(user)} &nbsp;
                        <button className='btn btn-danger'
                        onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </>
        )
    }
    

}


export default Profile