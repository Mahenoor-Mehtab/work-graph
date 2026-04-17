'use client'

import { useCallback } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { GraphData } from '@/types/graph'
import NodeCard from './NodeCard'

const nodeTypes = { custom: NodeCard }

interface Props {
  data: GraphData
  currentUserId: string
  currentUserName: string
}

export default function WorkGraphCanvas({ data, currentUserId, currentUserName }: Props) {
  const initialNodes = [
    {
      id: currentUserId,
      type: 'custom',
      position: { x: 300, y: 300 },
      data: { label: currentUserName, isCurrentUser: true },
    },
    ...data.nodes.map((node, i) => ({
      id: node.id,
      type: 'custom',
      position: {
        x: 300 + 200 * Math.cos((2 * Math.PI * i) / data.nodes.length),
        y: 300 + 200 * Math.sin((2 * Math.PI * i) / data.nodes.length),
      },
      data: {
        label: node.name,
        trustScore: node.trustScore,
        username: node.username,
        isCurrentUser: false,
      },
    })),
  ]

  const initialEdges = data.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.projectName,
    style: { stroke: '#7c3aed', strokeWidth: edge.weight },
  }))

  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden border border-zinc-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        colorMode="dark"
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}