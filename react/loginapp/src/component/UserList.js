import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import useLogout from './useLogout';


const baseUrl = process.env.REACT_APP_API_URL;

const UserList = () => {
    const [users,setUsers] = useState();
    const naviagte = useNavigate();
    const logout = useLogout()

    const renderTable = () => {
        if(users){
            return users.map((item) => {
                return(
                    <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                    </tr>
                )
            })
        }
    }

    useEffect(() => {
        axios.get(`${baseUrl}/users`).then((res) => {setUsers(res.data)})
    })

    if(sessionStorage.getItem('ltk') === null){
        naviagte('/')
    }
    if(sessionStorage.getItem('ltk') !== null && sessionStorage.getItem('rtk').toLowerCase() !== "admin" ){
        naviagte('/profile?message=You are not a Admin')
    }else{

        return(
            <>
                <hr/>
                <center>
                    <h3>Users</h3>
                </center> 
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Email</td>
                            <td>Role</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable()}
                    </tbody>

                </table>
                <button className='btn btn-danger'
                        onClick={logout}>
                            Logout
                </button> &nbsp;
                <Link to="/profile" className="btn btn-success">
                    Profile
                </Link>
            </>
        )
    }

}

export default UserList;