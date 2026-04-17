import { Collaboration, User } from "@prisma/client"

export interface GraphNode {
  id: string
  name: string
  username: string
  avatar?: string
  trustScore: number
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  weight: number
  projectName: string
  skillsUsed: string[]
}

export function buildGraphData(
  userId: string,
  collaborations: Collaboration[],
  users: User[]
) {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  const addedUsers = new Set<string>()

  collaborations
    .filter((c) => c.status === 'VERIFIED')
    .forEach((collab) => {
      const otherId =
        collab.initiatorId === userId
          ? collab.receiverId
          : collab.initiatorId

      const otherUser = users.find((u) => u.id === otherId)
      if (!otherUser) return

      if (!addedUsers.has(otherId)) {
        nodes.push({
          id: otherUser.id,
          name: otherUser.name,
          username: otherUser.username,
          avatar: otherUser.avatar ?? undefined,
          trustScore: otherUser.trustScore,
        })
        addedUsers.add(otherId)
      }

      edges.push({
        id: collab.id,
        source: userId,
        target: otherId,
        weight: collab.initiatorRating ?? 3,
        projectName: collab.projectName,
        skillsUsed: collab.skillsUsed,
      })
    })

  return { nodes, edges }
}