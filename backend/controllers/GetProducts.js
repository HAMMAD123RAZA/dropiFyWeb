import { Product } from "../models/ProductModel.js";
import mongoose from "mongoose";
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

const sql=neon(process.env.neonDb)

export const GetProducts=async(req,res)=>{
    try {
        const data=await sql`SELECT * FROM products`;
        res.json(data)
    } catch (error) {
        res.json({message:error.message})
    }
}

//flitering api

// export const filProduct = async (req, res) => {
//     const { price, category, litre } = req.query;  // Use req.query instead of req.body
//     let filters = {};

//     if (price) {
//         const [minPrice, maxPrice] = price.split('-').map(Number);
//         filters.price = { $gte: minPrice, $lte: maxPrice };
//     }

//     if (category) {
//         filters.category = category;
//     }

//     if (litre) {
//         filters.litre = litre;
//     }


//     try {
//         const data = await Product.find(filters);
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching data" });
//     }
// };

export const GetProduct=async(req,res)=>{
    const {Id}=req.params;
    
try {
    const data = await sql`SELECT * FROM products WHERE id=${Id}`;
    if (!data) {
     return  res.json({message:'product not found'})
    }
    res.status(200).json(data)
} catch (error) {
    res.status(500).json({message:"error fetching docs",error})
}
}