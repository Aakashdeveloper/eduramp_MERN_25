import './QuickSearch.css';
import {useState,useEffect} from 'react';
import QuickDisplay from './QuickDisplay';

const baseUrl = process.env.REACT_APP_API_URL

const QuickSearch = () => {
    const [mealType,setMealType] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/quicksearch`, {method:'GET'})
        .then((res) => res.json())
        .then((data) => {setMealType(data)})
    },[])



    return(
       <div className="quickSearch">
            <span id="QuickSearchHeading">
                Quick Search
            </span>
            <span id="QuickSubHeading">
                Find Restaurants By MealType
            </span>
            <img src=""/>
            <a href=""></a>
            <div>
                <QuickDisplay mealType={mealType}/>
            </div>
           
        </div>
    )
}

export default QuickSearch