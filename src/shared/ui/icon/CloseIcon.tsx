import Close from './close.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function CloseIcon({ ...props }: Props) {
  return (
    <i>
      <Close {...props} />
    </i>
  )
}
