import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

export const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={cn('text-xs [&>td]:bg-slate-100 hover:[&>td]:bg-slate-200', className)}
			role="row"
			{...props}
		/>
	)
)

TableRow.displayName = 'TableRow'
