const {z} = require('zod');

//creating an object schema

const signUpSchema = z.object({
  username: z
  .string({required_error: "Username is required"})
  .trim()
  .min(3, {message:"Username must be at least 3 characters long"})
  .max(255, {message:"Username must be at most 255 characters long"}),

  email: z
  .string({required_error: "Email is required"})
  .trim() 
  .email({message: "Invalid email address"})
  .min(3, {message: "Email must be at least 3 characters long"})
  .max(255, {message: "Email must be at most 255 characters long"}),

  phone: z
  .string({required_error: "Phone number is required"}) 
  .trim()
  .min(10,{message:"Phone must be at least 10 characters long"})
  .max(15,{message:"Phone must be at most 15 characters long"}),

  password: z
  .string({required_error: "Password is required"})
  .min(6, {message: "Password must be at least 6 characters long"})
  .max(1024, {message: "Password must be at most 1024 characters long"}),



});  

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(1024, { message: "Password must be at most 1024 characters long" }),
});

module.exports = { signUpSchema, loginSchema };
