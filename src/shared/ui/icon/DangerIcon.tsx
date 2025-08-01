import Danger from './danger.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function DangerIcon({ ...props }: Props) {
  return (
    <i>
      <Danger {...props} />
    </i>
  )
}
