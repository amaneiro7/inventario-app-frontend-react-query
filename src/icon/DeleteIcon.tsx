import Delete from './delete.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function DeleteIcon({...props}:Props) {
  return (
    <i>
      <Delete {...props} />
    </i>
  )
}
