import Check from './check.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function CheckIcon({...props}:Props) {
  return (
    <i>
      <Check {...props} />
    </i>
  )
}
