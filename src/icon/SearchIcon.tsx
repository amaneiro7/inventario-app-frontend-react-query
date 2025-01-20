import Search from './search.svg?react'

type Props = React.SVGProps<SVGSVGElement>

export function SearchIcon({ ...props }: Props) {
  return (
    <i>
      <Search {...props} />
    </i>
  )
}
