// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import { config } from 'dotenv';
// import router from './router/route.js';
// import errorMiddlware from './middleware/error.js'
// import path from 'path';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/route.js');
const errorMiddlware = require('./middleware/error.js');
const path = require('path');


/** import connection file */
const connect =  require('./database/conn.js');

const app = express()

/** app middlewares */
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path: './config/config.env'});
}


/** appliation port */
const port = process.env.PORT || 8080;

/** routes */
app.use('/api', router) /** apis */

// app.get('/', (req, res) => {
//     try {
//         res.json("Get Request")
//     } catch (error) {
//         res.json(error)
//     }
// })

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
})

app.use(errorMiddlware);

/** start server only when we have valid connection */
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Cannot connect to the server");
    }
}).catch(error => {
    console.log("Invalid Database Connection");
})