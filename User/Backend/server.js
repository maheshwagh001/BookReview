const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const session = require('express-session');
const MongoStore = require('connect-mongo');

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")

dotenv.config({
    path:  '.env'
})

connectDatabase()

const app = express() ;

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/sessions' }),
    cookie: { secure: false }
  }));

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