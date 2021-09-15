import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let reviews


export default class ReviewDAO{
    static async injectDB(conn){
        if(reviews){
            return
        }
        try{

            // Try to connect to the databse using the env vairbale and collection collection
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("restaruants")
            
            // Throw an error if the db connection does not connect
        }catch(e){
            console.log(
                `Unable to connect to the database with error ${e}`
            )
        }

    }


    // Method to add the data from the controller to the database
    static async addReview(restaurant, user, review, date){

        try{
            const reviewDoc = {
                name: user.name,
                user_id = user.id,
                date = date,
                text = review,
                restaurant_id = ObjectId(restaurant),

            }
            return await reviews.insertOne(reviewDoc) 

        }catch(e){
            console.log(
                `Unable to post review ${e}`
            )
            return{error: e}
        }

    }

      // Method to update the review from the controller to the database
      static async updateReview(reviewId, userId, text, date){

        try{
            const updateResponse = await reviews.updateOne (
                // First set is where we want to update
                {user_id: user, _id: ObjectId(reviewId)},
                // Second set is what we want to update
                {$set: {text: text, date:date}}   


            )
            return updateResponse

        }catch(e){
            console.log(
                `Unable to post review ${e}`
            )
            return{error: e}
        }

    }

// Method to update the review from the controller to the database
static async deleteReview(reviewId, userId){

    try{
        const deleteResponse = await reviews.deleteeOne (
            // Information needed to delete a docd
           {
               _id: ObjectId(reviewId),
               user:  userId,
           }
          

        )
        return deleteResponse

    }catch(e){
        console.log(
            `Unable to post review ${e}`
        )
        return{error: e}
    }

}


}