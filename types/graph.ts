export interface GraphNode {
  id: string
  name: string
  username: string
  avatar?: string
  trustScore: number
  position?: {
    x: number
    y: number
  }
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  weight: number
  projectName: string
  skillsUsed: string[]
  verified: boolean
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface GraphFilter {
  minTrustScore?: number
  skills?: string[]
  dateRange?: {
    from: Date
    to: Date
  }
}