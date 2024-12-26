import cloudinary from 'cloudinary';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.neonDb);

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const CreateProduct = async (req, res) => {
    try {
        const { name, category, price, image } = req.body;

        const data = await sql`
            INSERT INTO products (name, category, price, image) 
            VALUES (${name}, ${category}, ${price}, ${image}) 
            RETURNING *`;

        res.status(200).json({
            product: data[0],
            message: 'Product uploaded successfully',
        });
    } catch (error) {
        console.error("Error in backend:", error);
        res.status(500).json({ message: 'Error uploading product', error });
    }
};
