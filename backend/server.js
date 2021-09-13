import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

const app = express()

app.use(cors())
app.use(express.json)

// Setting the restuarant API
app.use("/api/v1/restaurants", restaurants)

// Route that does not exisit
app.use("*", (req, res) => res.status(404).json({error: "Not found"}))


// Export so we can import in another file
export default app

