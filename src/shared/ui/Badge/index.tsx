import { memo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

export const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-naranja text-naranja-foreground ',
				secondary: 'border-transparent bg-azul text-azul-foreground ',
				destructive: 'border-transparent bg-destructive text-destructive-foreground ',
				outline: 'text-foreground',
				naranja: 'border-transparent bg-naranja text-naranja-foreground ',
				azul: 'border-transparent bg-azul text-white ',
				verde: 'border-transparent bg-verde text-white ',
				rojo: 'border-transparent bg-rojo text-white '
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

export const Badge = memo(({ className, variant, ...props }: BadgeProps) => {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />
})

Badge.displayName = 'Badge'
