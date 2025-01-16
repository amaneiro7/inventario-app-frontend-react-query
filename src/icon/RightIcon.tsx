import Right from './Right.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function RightIcon({...props}:Props) {
  return (
    <i>
      <Right {...props} />
    </i>
  )
}
