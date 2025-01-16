import Add from './add.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function AddIcon({...props}:Props) {
  return (
    <i>
      <Add {...props} />
    </i>
  )
}
