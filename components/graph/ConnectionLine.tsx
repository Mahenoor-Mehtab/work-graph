import { getStraightPath } from '@xyflow/react'

interface Props {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  label?: string
}

export default function ConnectionLine({
  sourceX,
  sourceY,
  targetX,
  targetY,
}: Props) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return (
    <g>
      <path
        fill="none"
        stroke="#7c3aed"
        strokeWidth={2}
        className="animated"
        d={edgePath}
      />
      <circle
        cx={targetX}
        cy={targetY}
        fill="#7c3aed"
        r={3}
        stroke="#7c3aed"
        strokeWidth={1.5}
      />
    </g>
  )
}