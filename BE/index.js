const express = require('express');
require('dotenv').config()


const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const connectDB = require('./Config/Database/ConnectionDB.js');


const app = express();
app.use(express.json());

const cors = require("cors")
app.use(cors({
        origin: '*'
    }));
    
    // parse request to body-parser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())


dotenv.config( { path : 'config.env'} )

const PORT = process.env.PORT || 8080


// mongodb connection
connectDB();


// load routers
app.use('/', require('./src/Routers/RoomRouter'));
app.use('/', require('./src/Routers/CityRouter'));
app.use('/', require('./src/Routers/DistRouter'));
app.use('/', require('./src/Routers/WardRouter'));



app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
