import { Collaboration } from '@prisma/client'
import { generateTrustScore } from './ai'

export async function calculateTrustScore(
  userId: string,
  collaborations: Collaboration[]
): Promise<number> {
  const verified = collaborations.filter((c) => c.status === 'VERIFIED')

  if (verified.length === 0) return 0

  const avgRating =
    verified.reduce((sum, c) => {
      const rating =
        c.initiatorId === userId
          ? c.receiverRating ?? 3
          : c.initiatorRating ?? 3
      return sum + rating
    }, 0) / verified.length

  const graphData = JSON.stringify({
    totalCollabs: verified.length,
    avgRating,
    skills: [...new Set(verified.flatMap((c) => c.skillsUsed))],
  })

  try {
    const aiResult = await generateTrustScore(graphData)
    const parsed = JSON.parse(aiResult)
    return parsed.score ?? Math.min(avgRating * 20, 100)
  } catch {
    return Math.min(avgRating * 20, 100)
  }
}