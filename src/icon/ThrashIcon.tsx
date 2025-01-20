import Thrash from './thrash.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function ThrashIcon({ ...props }: Props) {
  return (
    <i>
      <Thrash {...props} />
    </i>
  )
}
