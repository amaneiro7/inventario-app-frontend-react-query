import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { memo } from 'react'

export const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-naranja text-naranja-foreground hover:bg-naranja/80',
				secondary: 'border-transparent bg-azul text-azul-foreground hover:bg-azul/80',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline: 'text-foreground',
				naranja:
					'border-transparent bg-naranja text-naranja-foreground hover:bg-naranja/80',
				azul: 'border-transparent bg-azul text-white hover:bg-azul/80',
				verde: 'border-transparent bg-verde text-white hover:bg-azul/80',
				rojo: 'border-transparent bg-rojo text-white hover:bg-azul/80'
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
