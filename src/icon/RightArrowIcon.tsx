import RightArrow from './rightArrow.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function RightArrowIcon( {...props }:Props) {
  return (
    <i>
      <RightArrow {...props} />
    </i>
  )
}
