import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
type AlignType = 'left' | 'center' | 'right'

export function TableCellWithUrl<T>({
	value,
	url,
	state,
	align = 'left',
	className
}: {
	value: string | number
	url: string
	state?: T
	align?: AlignType
	className?: string
}) {
	return (
		<Link
			className={cn(
				'px-2 text-left align-middle whitespace-nowrap text-ellipsis overflow-hidden break-words cursor-default hover:text-azul-700 hover:underline transition-colors duration-150',
				{ [`text-${align}`]: align },
				className
			)}
			state={{ state }}
			to={url}
		>
			{`${value}`}
		</Link>
	)
}
