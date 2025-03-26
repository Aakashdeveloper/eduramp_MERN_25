import {useState,useEffect} from 'react';
import './Search.css';

const baseUrl = process.env.REACT_APP_API_URL

const Search = () => {

    const [location,setLocation] = useState([])
    const [restaurant,setRestaurant] = useState([])

    useEffect(() => {

        //api calling on page load
        console.log(baseUrl)
        fetch(`${baseUrl}/location`,{method:'GET'})
        //return promise
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data)
            setLocation(data)
        })
        .catch((err) => {
            console.log(err)
        })
        console.log("inside useEffect")
    },[])


    const renderCity = (data) => {
        if(data){
            return data.map((item,index) => {
                return(
                    <option value={item.state_id} key={item.location_id}>{item.state}</option>
                    
                )
            })
        }
    }

    const renderRest = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option value={item.restaurant_id} key={item.restaurant_id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                    
                )
            })
        }
    }

    const handleCity = (event) =>{
        let stateId = event.target.value;
        fetch(`${baseUrl}/restaurant?stateId=${stateId}`,{method:'GET'})
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data)
            setRestaurant(data)
        })
        .catch((err) => {
            console.log(err)
        })

    }

    return(
       <div className='search'>
           <div id="logo">
               <span>D!</span>
           </div>
           <div id="heading">
               Search Place Near To You
           </div>
           <div id="dropdown">
               <select id="city-dropdown" onChange={handleCity} >
                   <option>----SELECT CITY----</option>
                   {renderCity(location)}
               </select>
               <select className="restSelect">
                   <option>----SELECT Restaurants----</option>
                   {renderRest(restaurant)}
               </select>
           </div>
       </div>
    )
}

export default Search