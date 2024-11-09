'use server'
import { z } from 'zod'
import { userLoginSchema, userSignupSchema } from '../schemas'
import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { signIn } from '@/auth'

export const registerAction = async (values: z.infer<typeof userSignupSchema>) => {
    console.log(values)
    const validFields = userSignupSchema.safeParse(values)

    if (validFields.success) {
        const { email, password, full_name } = validFields.data
        const hashedPassword = await bcrypt.hash(password, 10)

        try {
            const existingUser = await db.user.findUnique({
                where: {
                    email,
                },
            });

            if (existingUser) {
                // Return a specific error response when the user already exists
                return { success: false, message: 'User already exists' };
            }

            await db.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    full_name,
                },
            });

            return { success: true, message: 'User created successfully' };
        } catch (error) {
            // Log the actual error for debugging
            console.error('Database error:', error);

            // Return a specific error response when there's a database error
            return { success: false, message: 'Error saving data to the database' };
        }

    }

}

export const loginUser = async (data: z.infer<typeof userLoginSchema>) => {
    const { email, password } = data;

    try {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            return { success: false, message: 'Invalid email or password' };
        }

        return { success: true, message: 'Login successful' };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An error occurred during login' };
    }
};
