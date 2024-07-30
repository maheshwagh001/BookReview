const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")

const IndexRoute = require("./Routers/index")
const connectDatabase =async  () => {

    await mongoose.connect(process.env.MONGO_URI ,{useNewUrlParser : true})

    console.log("MongoDB Connection Successfully")

}

dotenv.config({
    path:  '.env'
})

connectDatabase()

const app = express() ;

app.use(express.json())
app.use(cors())

app.use("/",IndexRoute)


const PORT = process.env.PORT || 5000 ;

app.use(express.static(path.join(__dirname , "public") ))

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

})

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
})