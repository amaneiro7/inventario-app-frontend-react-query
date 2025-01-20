import Check from './check.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function CheckIcon({ ...props }: Props) {
  return (
    <i>
      <Check {...props} />
    </i>
  )
}
