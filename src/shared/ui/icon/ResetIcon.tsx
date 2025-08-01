import Reset from './reset.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function ResetIcon({ ...props }: Props) {
  return (
    <i>
      <Reset {...props} />
    </i>
  )
}
