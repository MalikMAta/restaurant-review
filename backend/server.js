import express from "express"
import cors from "cors"
import restaurants from "./api/resturatns.route.js"

const app = express()

app.use(cors())
app.use(express.json)

