import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import Home from './Home/Home';
import Listing from './Listing/listing';
import Details from './details/details';

const Routing = () => {
    return(
        <BrowserRouter future={{
            v7_startTransition: true,
          }}>
        <Header/>
        <Routes>
            <Route path="/" element={<Main/>}>
                <Route index element={<Home/>}/>
                <Route path="/listing/:mealId" element={<Listing/>}/>
                <Route path="/details" element={<Details/>}/>
            </Route>
        </Routes>
        <Footer/>

        </BrowserRouter>
    )

}

export default Routing