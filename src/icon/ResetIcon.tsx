import Reset from './reset.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function ResetIcon({...props}:Props) {
  return (
    <i>
      <Reset {...props} />
    </i>
  )
}
