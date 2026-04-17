import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  username: z.string().min(3, 'Username too short').max(20),
  password: z.string().min(8, 'Password too short'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
})

export const collaborationSchema = z.object({
  receiverId: z.string(),
  projectName: z.string().min(3),
  description: z.string().min(10),
  startDate: z.string(),
  endDate: z.string().optional(),
  skillsUsed: z.array(z.string()).min(1),
})

export const verifyCollabSchema = z.object({
  status: z.enum(['VERIFIED', 'REJECTED', 'DISPUTED']),
  rating: z.number().min(1).max(5).optional(),
})