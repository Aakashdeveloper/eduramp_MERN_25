import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import './listing.css';
import axios from 'axios';
import ListingDisplay from './listingDisplay'

const baseUrl = process.env.REACT_APP_API_URL

const Listing = () => {
    let params = useParams()
    let [mealId] = useState(params.mealId);
    let [restaurant,setRestaurants] = useState()

    useEffect(() => {
        axios.get(`${baseUrl}/restaurant?mealtype_id=${mealId}`, {method:'GET'})
        .then((res) => setRestaurants(res.data))
        .catch((err) => {console.log(err)})
    })

    return(
       <div className="row">
            <div id="mainListing">
                <div id="filter">

                </div>
                <ListingDisplay listData={restaurant}/>
            </div>
       </div>
    )
}

export default Listing