import React,{Component} from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL

class CusinieFilter extends Component{

    //http://3.17.216.66:4000/filter/4?cuisine=1

    cuisineFilter = (event) => {
        let mealId = this.props.mealId;
        let cuisineId = event.target.value;
        let cuisineUrl = "";
        if(cuisineId === ""){
            cuisineUrl = `${baseUrl}/filter/${mealId}`
        }else{
            cuisineUrl = `${baseUrl}/filter/${mealId}?cuisine=${cuisineId}`
        }

        axios.get(cuisineUrl)
            .then((res) => {this.props.restPerCuisine(res.data)})

    }


    render(){
        return(
            <>
                <center><h3>CusinieFilter</h3></center>
                <div style={{marginLeft:'15%'}} onChange={this.cuisineFilter}>
                    <label className="radio">
                        <input type="radio" value="" name="cuisine"/>All
                    </label>
                    <label className="radio">
                        <input type="radio" value="1" name="cuisine"/>North Indain
                    </label>
                    <label className="radio">
                        <input type="radio" value="2" name="cuisine"/>South Indain
                    </label>
                    <label className="radio">
                        <input type="radio" value="3" name="cuisine"/>Chinese
                    </label>
                    <label className="radio">
                        <input type="radio" value="4" name="cuisine"/>Fast Food
                    </label>
                    <label className="radio">
                        <input type="radio" value="5" name="cuisine"/>Street Food
                    </label>
                </div>
            </>
        )
    }
}

export default CusinieFilter