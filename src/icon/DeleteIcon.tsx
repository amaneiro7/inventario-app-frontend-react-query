import Delete from './delete.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function DeleteIcon({ ...props }: Props) {
  return (
    <i>
      <Delete {...props} />
    </i>
  )
}
