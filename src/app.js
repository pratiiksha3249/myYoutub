import express from"express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//app.use-use to middleware or configration,also add middleware
//cors-(Cross-Origin Resource Sharing)


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

//set middleware,this will accept data when user send data using form
app.use(express.json({limit:"16kb"}))

//this is when user send data using link(URL),extended is allows us to accept nested objects
app.use(express.urlencoded({extended:true,limit:"16kb"}))
//if we want to store the images or pdf in our local storage , we already created public folder,every one can access that img,pdf
app.use(express.static("public"))
application.use(cookieParser())

export {app}