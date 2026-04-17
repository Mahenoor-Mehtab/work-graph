export type UserRole = 'CANDIDATE' | 'COMPANY'

export type CollabStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'DISPUTED'

export type PlanType = 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE'

export interface User {
  id: string
  email: string
  name: string
  username: string
  avatar?: string
  bio?: string
  isAnonymous: boolean
  trustScore: number
  createdAt: Date
  updatedAt: Date
}

export interface Collaboration {
  id: string
  initiatorId: string
  receiverId: string
  projectName: string
  description: string
  startDate: Date
  endDate?: Date
  skillsUsed: string[]
  status: CollabStatus
  initiatorRating?: number
  receiverRating?: number
  createdAt: Date
  verifiedAt?: Date
  initiator?: User
  receiver?: User
}

export interface UserSkill {
  id: string
  userId: string
  skill: string
  proofCount: number
  lastUsed?: Date
}

export interface AIInsight {
  id: string
  userId: string
  type: string
  content: Record<string, unknown>
  generatedAt: Date
}

export interface TrustScoreResult {
  score: number
  insights: string[]
  summary: string
}

export interface SkillGapResult {
  missingSkills: string[]
  roadmap: string[]
  estimatedDays: number
}