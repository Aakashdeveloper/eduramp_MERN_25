import {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home/Home';

//jsx > Javascript XML
function App(){

    return(
        <>
            <Header/>
                <Home/>
            <Footer/>
        </>
    )
}


export default App;


