import Filter from './filter.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function FilterIcon({ ...props }: Props) {
  return (
    <i>
      <Filter {...props} />
    </i>
  )
}

