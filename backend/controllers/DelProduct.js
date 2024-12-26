import { Product } from "../models/ProductModel.js"
import { neon } from '@neondatabase/serverless';

import dotenv from 'dotenv';
dotenv.config();

const sql=neon(process.env.neonDb)

export const delProduct=async(req,res)=>{
    const {id}=req.params
    try {
        const data=await sql`DELETE FROM products WHERE id=${id}`
        res.status(200).json("prouduct deleted successfully")
    } catch (error) {
        console.log("eroor in backend",error)
        res.status(501)
    }
}