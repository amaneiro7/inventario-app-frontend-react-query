import { Link } from "react-router-dom"

export function TableCellWithUrl<T>({ value, url, state }: { value: string | number, url: string, state?: T }) {
return (
  <Link 
    className='px-2 text-left align-middle whitespace-nowrap text-ellipsis overflow-hidden break-words cursor-default hover:text-secondary-700 hover:underline transition-colors duration-150' 
    state={{ state }} 
    to={url}
  >
    {`${value}`}
  </Link> 

)
  }