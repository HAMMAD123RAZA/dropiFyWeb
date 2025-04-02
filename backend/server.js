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
import { sendEmailVerification, verifyEmail } from './controllers/SendEmailVerify.js';
dotenv.config();

//  deployed backend url
//https://dropapi-54rsae4p4-hammad-razas-projects.vercel.app

const app = express();
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173", 
    methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH", // Allows all HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "X-Custom-Header",
      "X-Auth-Token", // Add any custom headers here if needed
      "X-Frame-Options",
      "X-XSS-Protection",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ], // Allows all typical headers for communication
    exposedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "X-Custom-Header",
      "X-Auth-Token", // Exposes headers to the browser
    ],
    credentials: true, // Allow credentials such as cookies or authentication tokens
    maxAge: 86400, // Cache the CORS preflight response for 24 hours (in seconds)
  }  
  
app.use(cors(corsOptions));
    
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   }));
    
app.use(express.urlencoded({ extended: true }));

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
app.post('/send_email_verify', sendEmailVerification);

// Route to verify email
app.get('/verify-email', verifyEmail);

app.get('/', (req, res) => {
    res.send('Hi Wasup');
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

