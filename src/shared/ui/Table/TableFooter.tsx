import { cn } from '@/shared/lib/utils'
import { forwardRef } from 'react'

const TableFooter = forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
	<tfoot
		ref={ref}
		className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
		{...props}
	/>
))
TableFooter.displayName = 'TableFooter'
