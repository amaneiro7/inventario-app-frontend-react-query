import Cancel from './cancel.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function CancelIcon({...props}:Props) {
  return (
    <i>
      <Cancel {...props} />
    </i>
  )
}
