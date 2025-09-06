import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils'

export const DetailModalWrapper = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('max-w-4xl overflow-y-auto p-1 sm:p-4', className)}
				{...props}
			/>
		)
	}
)

DetailModalWrapper.displayName = 'DetailModalWrapper'
