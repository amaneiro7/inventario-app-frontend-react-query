import Right from './Right.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function RightIcon({ ...props }: Props) {
  return (
    <i>
      <Right {...props} />
    </i>
  )
}
