import RightArrow from './rightArrow.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function RightArrowIcon({ ...props }: Props) {
  return (
    <i>
      <RightArrow {...props} />
    </i>
  )
}
