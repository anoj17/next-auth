import * as z from 'zod'

export const userLoginSchema = z.object({
  email: z.string().email({
    message: 'username required!!'
  }),
  password: z.string().min(1, {
    message: 'password is required!!'
  }),
  // full_name: z.string()
})

export const userSignupSchema = z.object({
  email: z.string().email({
    message: 'username required!!'
  }),
  password: z.string().min(6, {
    message: 'minimum 6 characters!!'
  }),
  full_name: z.string({message: 'full name is required!!'})
})