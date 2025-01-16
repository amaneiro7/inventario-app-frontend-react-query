import Search from './search.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function SearchIcon( {...props }:Props) {
  return (
    <i>
      <Search {...props} />
    </i>
  )
}
