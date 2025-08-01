import ThinRight from './thinRight.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function ThinRightIcon({ ...props }: Props) {
  return (
    <i>
      <ThinRight {...props} />
    </i>
  )
}
