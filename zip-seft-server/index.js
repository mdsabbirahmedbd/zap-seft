const express = require('express');
const {connectDB} = require('./config/mongodb');
const routes = require('./Routes/routes');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 5000;

require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());


// mongodb connectDB
connectDB();


// use routes 
app.use('/',routes);


module.exports(app)