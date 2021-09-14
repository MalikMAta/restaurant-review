let restaurants
export default class RestaurantsDOA{
     static async injectDB(conn){
         if(restaurants) {
             return
         }
         try{
             restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
         }
         catch(e){
             console.error(
                 `Unable to establish a collection handle in rastaurnatsDAO: ${e}`,
             )

         }
     }
     
static async getRestaurants({
    filters = null,
    page=0,
    restaurantsPerPage = 20
} ={}) {
    let query
    if(filters){
        if("name" in filters) {
            query = {$text: {$search: filters["name"] } }
        } else if ("cuisine" in filters){
            query = {"cuisine": {$eq: filters["cuisine"] } }
        } else if ("zipcode" in filters){
            query = {"address.zipcode": {$eq: filters ["zipcode"]}}
        }

    }

    let cursor
    try{
        cursor = await restaurants
            .find(query)       
    } catch(e) {
        console.log(`Unable to issue find command, ${e}`)
        return { restaurants: [], totalNumRestaurants: 0}
    }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
        try{
            const restaurants = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.counDocuments(query)

            return{restaurantsList, totalNumRestaurantst}
        }catch(e) {
            console.error(
                `Unable to convert curso to array or problem counting documents , $`
            )
        }

}


}