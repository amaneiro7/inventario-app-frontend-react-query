import Cancel from './cancel.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function CancelIcon({ ...props }: Props) {
  return (
    <i>
      <Cancel {...props} />
    </i>
  )
}
