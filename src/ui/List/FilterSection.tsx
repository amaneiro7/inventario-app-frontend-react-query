import { memo } from 'react'
import { cn } from '@/lib/utils'

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
						'relative grid h-10 min-h-min w-full grid-cols-[repeat(auto-fit,250px)] gap-4',
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
