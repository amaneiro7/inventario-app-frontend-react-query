import Danger from './danger.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function DangerIcon({...props}:Props) {
  return (
    <i>
      <Danger {...props} />
    </i>
  )
}
