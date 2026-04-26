import { memo } from 'react'
import { cn } from '@/shared/lib/utils'

export const FilterSection = memo(
	({
		children,
		className,
		...props
	}: React.PropsWithChildren<React.JSX.IntrinsicElements['search']>) => {
		return (
			<search {...props}>
				<form
					className={cn(
						'relative grid h-10 min-h-min w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
						className
					)}
				>
					{children}
				</form>
			</search>
		)
	}
)

FilterSection.displayName = 'FilterSection'
