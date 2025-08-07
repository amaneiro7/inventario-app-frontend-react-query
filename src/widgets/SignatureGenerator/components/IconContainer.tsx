import { cn } from '@/shared/lib/utils'

export const IconContainer = ({
	children,
	className
}: React.PropsWithChildren<{ className?: string }>) => (
	<span
		className={cn(
			'bg-azul flex h-5 w-5 items-center justify-center rounded-full p-0.5',
			className
		)}
	>
		{children}
	</span>
)
