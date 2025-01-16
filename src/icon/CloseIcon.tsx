import Close from './close.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function CloseIcon({...props}:Props) {
  return (
    <i>
      <Close {...props} />
    </i>
  )
}
