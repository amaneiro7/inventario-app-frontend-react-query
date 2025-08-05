import { memo } from 'react'
import cn from 'classnames'
import { twMerge } from 'tailwind-merge'

interface Props
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	text: string
	color: keyof typeof Color
	size: keyof typeof Size
	buttonSize: keyof typeof ButtonSize
	className?: string
	hoverTranslation?: boolean
	icon?: React.JSX.Element | null
}

import { Color, Size, ButtonSize } from './styles'

const hoverStyle = 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'

function Button({
	text,
	hoverTranslation,
	icon,
	className,
	buttonSize,
	size,
	color,
	...props
}: Props) {
	const classes = twMerge(
		'flex justify-center text-b items-center gap-2 font-medium rounded-md cursor-pointer border border-solid transition-all duration-200 ease-in disabled:opacity-70 disabled:cursor-not-allowed',
		cn({
			[`${Color[color]}`]: color,
			[`${ButtonSize[buttonSize]}`]: buttonSize,
			[`${Size[size]}`]: size,
			[hoverStyle]: hoverTranslation
		}),
		className
	)
	return (
		<button className={classes} aria-label={`${text}`} title={`${text}`} {...props}>
			{icon}
			{text}
		</button>
	)
}

export default memo(Button)
