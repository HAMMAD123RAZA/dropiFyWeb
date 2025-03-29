import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();
const sql=neon(process.env.neonDb)


export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Fix 1: Check array length instead of truthiness
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        if (user.length > 0) {  // Check if any users were found
            return res.status(400).json({ message: "user already exists" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        // Fix 2: Fix the returning value reference
        const newUser = await sql`INSERT INTO users (username, email, password) 
                                 VALUES (${username}, ${email}, ${hashPass}) 
                                 RETURNING *`;
        
        // Fix 3: Use newUser[0] since query returns an array
        const token = jwt.sign(
            { id: newUser[0].id, email },  // Changed _id to id
            'meri_jwt_secKey',
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ message: 'user created', user: newUser[0], token });
    } catch (error) {
        res.status(500).json({ message: 'error creating user', error: error.message });
    }
};

// Login function (also needs similar fixes)
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        if (user.length === 0) {  // Fix: Check array length
            return res.status(400).json({ message: 'user doesnt exist' });
        }

        // Fix: Use user[0] to access the first (and only) user
        const comparePass = await bcrypt.compare(password, user[0].password);
        if (!comparePass) {
            return res.status(401).json({ message: "invalid password or email" });
        }

        const token = jwt.sign(
            { id: user[0].id, email },
            'meri_jwt_secKey',
            { expiresIn: "1h" }
        );
        
        res.status(200).json({ message: "user logged in", token });
    } catch (error) {
        res.status(500).json({ message: 'error logging in', error: error.message });
    }
};
