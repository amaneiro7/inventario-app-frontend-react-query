import { twMerge } from 'tailwind-merge'
import cn from 'classnames'

interface Props
	extends React.DetailedHTMLProps<
		React.TdHTMLAttributes<HTMLTableCellElement>,
		HTMLTableCellElement
	> {
	size: keyof typeof Size
}

const Size = {
	auto: 'w-auto', // auto
	xxSmall: 'max-w-8 min-w-8 w-8', // 32px
	xSmall: 'max-w-20 min-w-20 w-20', // 80px
	small: 'max-w-28 min-w-28 w-28', // 112px
	medium: 'max-w-36 min-w-36 w-36', // 144px
	large: 'max-w-44 min-w-44 w-44', // 176px
	xLarge: 'max-w-52 min-w-52 w-52', // 224px
	xxLarge: 'max-w-60 min-w-60 w-60' // 256px
} as const

export function TableCellWithChildren({
	size,
	className,
	children,
	...props
}: React.PropsWithChildren<Props>) {
	const classes = twMerge(
		'min-h-8 h-8 p-0 text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis border-b-2 border-b-gray-300 ',
		cn({
			[`${Size[size]}`]: size
		}),
		className
	)
	return (
		<td role="cell" tabIndex={-1} className={classes} {...props}>
			{children}
		</td>
	)
}
