import Filter from './filter.svg?react'

interface Props extends React.SVGProps<SVGSVGElement> {}

export function FilterIcon({...props}:Props) {
  return (
    <i>
      <Filter {...props} />
    </i>
  )
}

