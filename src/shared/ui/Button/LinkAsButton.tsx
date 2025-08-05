import { Link, LinkProps } from 'react-router-dom'
import cn from 'classnames'
import { twMerge } from 'tailwind-merge'

interface Props extends LinkProps {
	text: string
	className?: string
	state?: LinkProps['state']
	color: keyof typeof Color
	icon?: React.ReactElement
	size?: keyof typeof Size
	buttonSize: keyof typeof ButtonSize
	hoverTranslate?: boolean
}

import { Color, Size, ButtonSize } from './styles'

const hoverStyle = 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'

export function LinkAsButton({
	text,
	state,
	hoverTranslate,
	className,
	icon,
	to,
	color,
	size = 'content',
	buttonSize,
	...props
}: Props) {
	const classes = twMerge(
		'flex justify-center text-b items-center gap-2 font-medium rounded-md cursor-pointer border border-solid transition-all duration-200 ease-in disabled:opacity-70 disabled:cursor-not-allowed',
		cn({
			[`${Color[color]}`]: color,
			[`${ButtonSize[buttonSize]}`]: buttonSize,
			[`${Size[size]}`]: size,
			[hoverStyle]: hoverTranslate
		}),
		className
	)
	return (
		<Link
			className={classes}
			aria-label={`${text}`}
			title={`${text}`}
			state={{ state }}
			to={to}
			replace
			{...props}
		>
			{icon}
			{text}
		</Link>
	)
}
