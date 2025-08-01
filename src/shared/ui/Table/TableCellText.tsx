import { cn } from '@/shared/lib/utils'

type AlignType = 'left' | 'center' | 'right'
export function TableCellText({
	value,
	align = 'left',
	className
}: {
	value: string | number
	align?: AlignType
	className?: string
}) {
	return (
		<p
			className={cn(
				'cursor-default overflow-hidden px-2 text-left align-middle break-words text-ellipsis whitespace-nowrap',
				{ [`text-${align}`]: align },
				className
			)}
		>
			{value}
		</p>
	)
}
