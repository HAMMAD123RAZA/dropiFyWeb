// Import statements
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer'

import { User } from './models/UserModel.js';
import { CreateProduct } from './controllers/CreateProduct.js';
import {  GetProduct, GetProducts } from './controllers/GetProducts.js';
import { login, signUp } from './controllers/UserController.js';
import { delProduct } from './controllers/DelProduct.js';
import { createOrder } from './controllers/CreateOrder.js';
import {neon} from '@neondatabase/serverless'
import dotenv from 'dotenv';
dotenv.config();

//  deployed backend url
// https://backend-do3qpamj4-hammad-razas-projects.vercel.app/

// https://dropapi-213310my7-hammad-razas-projects.vercel.app/

const app = express();
app.use(express.json());

app.use(
  cors({
    origin:'*', 
    credentials:true,           
    optionSuccessStatus:200
  })
);

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   }));
    
app.use(express.urlencoded({ extended: true }));

//db.js
const sql=neon(process.env.neonDb)

const conn=async()=>{
    try {
        await sql `SELECT 1`
        console.log('DATABSE CONNECTED')
    } catch (error) {
        console.log('FAILED TO CONNECT TO DB',error)
        // process.exit(1)
    }
}

conn()

app.post('/create', CreateProduct);
app.get('/get', GetProducts);
app.get('/get/:Id', GetProduct);
app.post('/register', signUp);
app.post('/login', login);
app.delete('/delete/:id', delProduct);
app.post('/sendOrder', createOrder);

app.get('/', (req, res) => {
    res.send('hello wsup');
});

// Disabling caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.myGmail, 
      pass: process.env.gmailPass, 
    },
  });
  
  // Endpoint to send order email
  app.post('/send-order', async (req, res) => {
    const { items } = req.body;
    console.log('Received items:', req.body.items);

    if (!items || !Array.isArray(items)) {
        return res.status(400).send({ message: 'Invalid data sent to the server' });
    }

    const emailContent = items
        .map((item) => `Name: ${item.name}, Price: ${item.price}`)
        .join('<br>');

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: process.env.myGmail,
        subject: 'Order Confirmation',
        html: `<h1>Your Order Details</h1><p>${emailContent}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Error sending email', error });
    }
});
  
// Start server and connect to DB
app.listen(8080, '0.0.0.0', async () => {
    console.log('Server started on port 8080');
    // connectDb()
});