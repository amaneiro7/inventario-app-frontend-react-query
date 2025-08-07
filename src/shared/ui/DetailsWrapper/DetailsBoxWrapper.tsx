import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'

interface Props
	extends React.PropsWithChildren<
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {
	position?: Position
}

type Position = 'left' | 'center' | 'right'

export const DetailsBoxWrapper = memo(
	({ position = 'left', children, className, ...props }: Props) => {
		const classes = twMerge(
			'w-full p-4 flex flex-col gap-3 bg-white shadow-sm rounded-2xl',
			cn({
				[`items-${position}`]: position
			}),
			className
		)
		return (
			<div className={classes} {...props}>
				{children}
			</div>
		)
	}
)
