import Add from './add.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function AddIcon({ ...props }: Props) {
  return (
    <i>
      <Add {...props} />
    </i>
  )
}
