# Page1 (Home Page)

* List of All State (GET)
> http://localhost:9200/location

* List of all Restaurants (GET)
> http://localhost:9200/restaurants

* Restaurants WRT State (GET)
> http://localhost:9200/restaurants?stateId=1


* List of All Meal Type (GET)
> http://localhost:9200/mealtype



# Page2 (Listing Page)
* Restaurants WRT Mealtype (GET)
> http://localhost:9200/filters/1

* Restaurants WRT Mealtype + Cuisine (GET)
> http://localhost:9200/filters/1?cuisineId=3

* Restaurants WRT Mealtype + Cost (GET)
* Sort on basis of Price (GET)


#
* Place Order (POST)
> http://localhost:9200/placeOrder
{
        "orderId":2,
        "name": "Anchal",
        "email": "anchal@gmail.com",
        "address": "Hno 23,Sector 1",
        "phone": 768768686,
        "cost": 124,
        "menuItem": [
            6,
            34,
            23
        ],
        "status": "Pending",
        "deleteStatus":0
    }

* Update Order (PUT)
> http://localhost:9200/updateOrder
{
    "_id":"67dcec93e6319d5c26ca23c6",
    "status":"Delivered"
}