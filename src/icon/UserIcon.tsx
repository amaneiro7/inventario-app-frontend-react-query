import User from './user.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function UserIcon({...props}:Props) {
  return (
    <i>
      <User {...props} />
    </i>
  )
}
