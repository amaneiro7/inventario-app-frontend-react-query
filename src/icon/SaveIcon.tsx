import Save from './save.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function SaveIcon( {...props }:Props) {
  return (
    <i>
      <Save {...props} />
    </i>
  )
}
