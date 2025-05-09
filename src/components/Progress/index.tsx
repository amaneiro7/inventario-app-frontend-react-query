import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const Progress = forwardRef<
	React.ComponentRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn('bg-azul-800 relative h-4 w-full overflow-hidden rounded-full', className)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className="bg-azul-900 h-full w-full flex-1 transition-all"
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
