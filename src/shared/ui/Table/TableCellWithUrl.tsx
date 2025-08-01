import { cn } from '@/shared/lib/utils'
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
				'hover:text-azul-700 cursor-default overflow-hidden px-2 text-left align-middle break-words text-ellipsis whitespace-nowrap transition-colors duration-150 hover:underline',
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
