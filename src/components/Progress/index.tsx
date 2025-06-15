import { forwardRef } from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
	// New props for custom colors
	backgroundColor?: string // Tailwind CSS class or direct hex/rgb for background
	indicatorColor?: string // Tailwind CSS class or direct hex/rgb for indicator
}

const Progress = forwardRef<React.ComponentRef<typeof ProgressPrimitive.Root>, ProgressProps>(
	({ className, value, backgroundColor, indicatorColor, ...props }, ref) => (
		<ProgressPrimitive.Root
			ref={ref}
			className={cn(
				'relative h-2 w-full overflow-hidden rounded-full',
				backgroundColor ?? 'bg-gris',
				className
			)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				className={cn(
					'h-full w-full flex-1 transition-all',
					indicatorColor ?? 'bg-azul-900'
				)}
				data-max={100}
				data-state="indeterminate"
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	)
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
