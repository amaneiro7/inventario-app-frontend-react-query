import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

export const DetailModalContent = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
	({ className, ...props }, ref) => {
		return (
			<main
				ref={ref}
				className={cn('grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start', className)}
				{...props}
			/>
		)
	}
)

DetailModalContent.displayName = 'DetailModalContent'
