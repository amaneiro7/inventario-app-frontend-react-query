import { twMerge } from 'tailwind-merge'
import { type TableCell } from './TableCell'
import { type TableHead } from './TableHead'

interface Props<T extends typeof TableHead | typeof TableCell>
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLTableRowElement>,
		HTMLTableRowElement
	> {
	children: React.ReactElement<T> | React.ReactElement<T>[]
}

export function TableRow<T extends typeof TableHead | typeof TableCell>({
	children,
	className,
	...props
}: Props<T>) {
	const classes = twMerge('[&>td]:bg-slate-100 [&>td]:hover:bg-slate-200 text-xs', className)
	return (
		<tr className={classes} role="row" {...props}>
			{children}
		</tr>
	)
}
