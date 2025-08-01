import Edit from './edit.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function EditIcon({...props}:Props) {
  return (
    <i>
      <Edit {...props} />
    </i>
  )
}

