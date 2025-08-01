import { twMerge } from 'tailwind-merge'
import { type TableCell } from './TableCell'
import { type TableHead } from './TableHead'
import { cn } from '@/shared/lib/utils'

interface Props<T extends typeof TableHead | typeof TableCell>
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLTableRowElement>,
		HTMLTableRowElement
	> {
	children:
		| (React.ReactElement<T> | undefined | null)
		| (React.ReactElement<T> | undefined | null)[]
}

export function TableRow<T extends typeof TableHead | typeof TableCell>({
	children,
	className,
	...props
}: Props<T>) {
	const classes = twMerge(cn('[&>td]:bg-slate-100 hover:[&>td]:bg-slate-200 text-xs', className))
	return (
		<tr className={classes} role="row" {...props}>
			{children}
		</tr>
	)
}
