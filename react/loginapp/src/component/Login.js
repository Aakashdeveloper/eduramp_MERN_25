import {useRef,useState} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_URL;

const Login = () => {

    const navigate = useNavigate()
    const emailRef = useRef()
    const passRef = useRef()
    const [message,setMessage] = useState()

    function handleSubmit(){
        const formData = {
            email: emailRef.current.value,
            password: passRef.current.value
        }

        console.log(formData)
        fetch(`${baseUrl}/login`,{
            method:'POST',
            headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.auth ===  false){
                setMessage(data.token)
            }else{
                sessionStorage.setItem('ltk',data.token)
                navigate('/profile')
            }
        })
    }

    return(
        <>
            <br/>
            <div className='panel panel-success'>
                <div className='panel-heading'>
                    <h3>Login User</h3>
                </div>
                <div className='panel-body'>
                    <h2 style={{color:'red'}}>{message}</h2>
                    <div className='row'>
                        <div className='col-md-6 form-group'>
                            <label>Email</label>
                            <input className='form-control' ref={emailRef}/>
                        </div>
                        <div className='col-md-6 form-group'>
                            <label>Password</label>
                            <input className='form-control' ref={passRef}/>
                        </div>
                    </div>
                    <button className='btn btn-info'
                    onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login