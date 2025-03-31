import { cn } from '@/lib/utils'

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
				'px-2 text-left align-middle whitespace-nowrap text-ellipsis overflow-hidden break-words cursor-default',
				{ [`text-${align}`]: align },
				className
			)}
		>
			{value}
		</p>
	)
}
