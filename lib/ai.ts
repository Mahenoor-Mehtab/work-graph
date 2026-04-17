import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

export async function generateTrustScore(graphData: string): Promise<string> {
  const prompt = `
    Analyze this professional work graph data and generate a trust score from 0-100.
    Also provide 3 key insights.
    
    Data: ${graphData}
    
    Respond in JSON format:
    {
      "score": number,
      "insights": string[],
      "summary": string
    }
  `
  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function generateSkillGap(
  userSkills: string[],
  targetRole: string
): Promise<string> {
  const prompt = `
    Given these verified skills: ${userSkills.join(', ')}
    Target role: ${targetRole}
    
    Provide skill gap analysis in JSON:
    {
      "missingSkills": string[],
      "roadmap": string[],
      "estimatedDays": number
    }
  `
  const result = await model.generateContent(prompt)
  return result.response.text()
}