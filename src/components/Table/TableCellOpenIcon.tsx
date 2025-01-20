import { lazy } from "react"

type Props = React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> & {
  open: boolean,   
}

const ArrowRightBadgeIcon = lazy(async () => import("../icon/ArrowRightBadge").then(m => ({ default: m.ArrowRightBadgeIcon })))


export function TableCellOpenIcon({ open, ...props }: React.PropsWithChildren<Props>) {
  return (
    <td
      className='min-w-min max-w-min w-8 border-b-2 border-b-gray-300 content-center'
      {...props}
    >
      <ArrowRightBadgeIcon className={`w-4 mx-0 my-auto text-center aspect-square transition-transform duration-500 ${open ? 'rotate-90' : '-rotate-90'} text-secondary-600 hover:text-secondary-700`} />
    </td>
  )
}

