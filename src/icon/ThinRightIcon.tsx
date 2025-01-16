import ThinRight from './thinRight.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function ThinRightIcon({...props}:Props) {
  return (
    <i>
      <ThinRight {...props} />
    </i>
  )
}
