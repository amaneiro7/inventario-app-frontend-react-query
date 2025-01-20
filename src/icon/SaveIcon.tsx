import Save from './save.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function SaveIcon({ ...props }: Props) {
  return (
    <i>
      <Save {...props} />
    </i>
  )
}
