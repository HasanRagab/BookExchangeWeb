import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
})

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name cannot exceed 50 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name cannot exceed 50 characters" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    role: z.enum(["reader", "bookOwner"], { message: "Please select a valid role" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const borrowRequestSchema = z
  .object({
    borrowStartDate: z.string().min(1, { message: "Start date is required" }),
    borrowEndDate: z.string().min(1, { message: "End date is required" }),
    message: z.string().max(500, { message: "Message cannot exceed 500 characters" }).optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.borrowStartDate)
      const end = new Date(data.borrowEndDate)
      return end > start
    },
    {
      message: "End date must be after start date",
      path: ["borrowEndDate"],
    },
  )
