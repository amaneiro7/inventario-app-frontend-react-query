import { memo } from 'react'
import { cn } from '@/shared/lib/utils'

interface Props
	extends React.PropsWithChildren<
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	position?: Position
}

type Position = 'start' | 'center' | 'end'

export const DetailsBoxWrapper = memo(({ position, children, className, ...props }: Props) => {
	const classes = cn(
		'w-full p-4 flex flex-col gap-3 bg-white shadow-sm rounded-2xl',
		{
			[`items-${position}`]: position
		},
		className
	)
	return (
		<div className={classes} {...props}>
			{children}
		</div>
	)
})
