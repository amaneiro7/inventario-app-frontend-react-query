import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { type TableBody } from './TableBody'
import { type TableHeader } from './TableHeader'

type Props<T> = React.DetailedHTMLProps<
	React.TableHTMLAttributes<HTMLTableElement>,
	HTMLTableElement
> & {
	children: React.ReactElement<T> | React.ReactElement<T>[]
}

function TableComponent<T extends typeof TableBody | typeof TableHeader>({
	children,
	className,
	...props
}: Props<T>) {
	const classes = twMerge(
		'clear-both relative w-min-content border-separate border-spacing-0 table rounded-e-lg overflow-hidden',
		className
	)
	return (
		<table tabIndex={-1} role="table" className={classes} {...props}>
			{children}
		</table>
	)
}

export const Table = memo(TableComponent)
