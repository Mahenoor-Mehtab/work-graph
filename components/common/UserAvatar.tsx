import Image from 'next/image'

interface Props {
  name: string
  avatar?: string
  size?: number
}

export default function UserAvatar({ name, avatar, size = 40 }: Props) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    )
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-purple-600 flex items-center justify-center text-white font-medium text-sm"
    >
      {initials}
    </div>
  )
}