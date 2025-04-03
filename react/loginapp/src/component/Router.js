import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import UserList from './UserList'

const Routing = () => {
    return(
        <BrowserRouter future={{
            v7_startTransition: true,
          }}>
        <Header/>
        <Routes>
            <Route path="/" element={<Main/>}>
                <Route index element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/userList" element={<UserList/>}/>
            </Route>
        </Routes>
        <Footer/>

        </BrowserRouter>
    )

}

export default Routing