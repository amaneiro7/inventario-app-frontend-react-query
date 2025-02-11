import { Link, LinkProps } from 'react-router-dom'
import cn from 'classnames'
import { twMerge } from 'tailwind-merge'

interface Props {
	text: string
	className?: string
	state?: LinkProps['state']
	color: keyof typeof Color
	url: string
	icon?: React.ReactElement
	size?: keyof typeof Size
	buttonSize: keyof typeof ButtonSize
	hoverTranslate?: boolean
}

const Size = {
	full: 'w-full',
	content: 'w-max'
} as const

const ButtonSize = {
	small: 'min-h-6 h-6 py-1 px-2 text-xs',
	medium: 'min-h-8 h-8 py-2 px-2 text-sm',
	large: 'min-h-11 h-11 py-2 px-4 text-base'
} as const

const Color = {
	orange: 'border-none text-white bg-naranja hover:bg-naranja-700 disabled:bg-naranja-700 active:bg-naranja-800',
	green: 'border-none text-white border-verde bg-verde hover:bg-verde-800 disabled:bg-verde-800 active:bg-verde-900',
	gray: 'text-cancel border-cancel bg-gray-200 hover:text-white hover:bg-cancel active:bg-cancel hover:shadow-md',
	red: 'border-none text-white border-rojo bg-rojo hover:bg-rojo-500 disabled:bg-rojo-500 active:bg-rojo-rojo-700',
	blue: 'border-none text-white border-azul bg-azul-800 hover:bg-azul-700 disabled:bg-azul-700 active:bg-azul-950',
	blanco: `text-azul border border-azul bg-white hover:text-white hover:bg-azul disabled:bg-azul`
} as const

const hoverStyle = 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'

export function LinkAsButton({
	text,
	state,
	hoverTranslate,
	className,
	icon,
	url,
	color,
	size = 'content',
	buttonSize
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
			to={url}
			replace
		>
			{icon}
			{text}
		</Link>
	)
}
