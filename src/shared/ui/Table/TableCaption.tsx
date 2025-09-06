import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

export const TableCaption = forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
	<caption ref={ref} className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />
))
TableCaption.displayName = 'TableCaption'
