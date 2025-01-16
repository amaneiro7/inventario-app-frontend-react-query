import Thrash from './thrash.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function ThrashIcon({...props}:Props) {
  return (
    <i>
      <Thrash {...props} />
    </i>
  )
}
