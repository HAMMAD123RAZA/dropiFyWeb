import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();
const sql=neon(process.env.neonDb)


export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ 
            success: false,
            message: "All fields are required" 
        });
    }
    
    try {
        // Check if user exists
        const existingUser = await sql`SELECT * FROM users WHERE email=${email}`;
        if (existingUser.length > 0) {
            return res.status(400).json({ 
                success: false,
                message: "User already exists" 
            });
        }

        // Hash password
        const hashPass = await bcrypt.hash(password, 10);
        
        // Insert new user
        const newUser = await sql`
            INSERT INTO users (
                username, 
                email, 
                password, 
                is_verified, 
                verification_token, 
                token_expiry
            ) VALUES (
                ${username}, 
                ${email}, 
                ${hashPass}, 
                false, 
                NULL, 
                NULL
            ) RETURNING *`;
        
        // Generate JWT token
        const token = jwt.sign(
            { id: newUser[0].id, email }, 
            process.env.JWT_SECRET || 'meri_jwt_secKey',
            { expiresIn: '1h' }
        );
        
        // Return success response
        return res.status(201).json({ 
            success: true,
            message: 'User created successfully', 
            newUser: {
                id: newUser[0].id,
                username: newUser[0].username,
                email: newUser[0].email,
                is_verified: newUser[0].is_verified
            }, 
            token 
        });
    } catch (error) {
        console.error('SignUp error:', error);
        return res.status(500).json({ 
            success: false,
            message: 'Error creating user', 
            error: error.message 
        });
    }
};;

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
