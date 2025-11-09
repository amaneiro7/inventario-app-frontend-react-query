import { memo } from 'react'
import { cn } from '@/shared/lib/utils'

export const UserCardProfile = memo(
	({
		children,
		className,
		...props
	}: React.PropsWithChildren<
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	>) => (
		<div className={cn('grid grid-cols-[1fr_2fr] items-center gap-4', className)} {...props}>
			{children}
		</div>
	)
)
