import { memo } from 'react'
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
	return (
		<table
			className={`clear-both relative min-w-full border-separate border-spacing-0 table rounded-e-lg overflow-hidden ${className}`}
			{...props}
		>
			{children}
		</table>
	)
}

export const Table = memo(TableComponent)
