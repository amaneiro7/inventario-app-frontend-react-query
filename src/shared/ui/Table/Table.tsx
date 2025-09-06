import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

export const Table = forwardRef<HTMLTableElement, React.HtmlHTMLAttributes<HTMLTableElement>>(
	({ className, ...props }, ref) => (
		<table
			tabIndex={-1}
			role="table"
			ref={ref}
			className={cn(
				'w-min-content relative clear-both table border-separate border-spacing-0 overflow-hidden rounded-e-lg',
				className
			)}
			{...props}
		/>
	)
)

Table.displayName = 'Table'
