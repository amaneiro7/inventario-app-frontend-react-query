import cn from 'classnames'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props
	extends React.PropsWithChildren<
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
	> {
	borderColor?: keyof typeof Color
}

const Color = {
	orange: 'naranja-400',
	blue: 'azul',
	green: 'verder',
	red: 'rojo'
} as const

export const DetailsWrapper = memo(({ borderColor = 'blue', children, ...props }: Props) => {
	const classes = twMerge(
		'w-full h-full mx-auto flex flex-col gap-4 p-4 mb-5 border-t-2 rounded bg-gray-200',
		cn({
			[`border-${Color[borderColor]}`]: borderColor
		}),
		props?.className
	)
	return (
		<section className={classes} {...props}>
			{children}
		</section>
	)
})
