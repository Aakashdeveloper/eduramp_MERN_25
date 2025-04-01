import {useState,useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const PlaceOrder = () => {

    let {restName} = useParams()
    const [formData, setFormData] = useState({
        id:Math.floor(Math.random()*1000),
        name:"Rohit",
        phone:987654342,
        address:""
    })

    const [errors, setErrors] = useState({phone:""})

    const validatePhone = (phone) => {
        return ""
    }

    const handleChange = (event) => {
        const {name,value} = event.target

        setFormData({...formData, [name]:value})
        if(name === "phone"){
            const errorMsg = validatePhone(value);
            setErrors({...errors,phone:errorMsg})
        }
    }
    return(
        <>
            <br/>
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3>You are Placing Order for {restName} </h3>
                    </div>
                    <div className="panel-body">
                        <input type="hidden" name="cost" value="100"/>
                        <div className="col-md-6 form-group">
                            <label>Name</label>
                            <input className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Phone</label>
                            <input className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            />
                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Address</label>
                            <input className="form-control"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-success" onClick={placeOrder}>
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceOrder