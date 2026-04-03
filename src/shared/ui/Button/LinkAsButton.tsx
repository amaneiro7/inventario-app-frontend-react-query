import { memo } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { Color, Size, ButtonSize } from './styles'
import { cn } from '@/shared/lib/utils'

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

const hoverStyle = 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'

export const LinkAsButton = memo(
	({
		text,
		state,
		hoverTranslate,
		className,
		icon,
		to,
		color,
		size = 'content',
		buttonSize,
		replace = false, // Ahora es opcional y por defecto es false
		...props
	}: Props) => {
		return (
			<Link
				className={cn(
					'flex cursor-pointer items-center justify-center gap-2 rounded-md border border-solid font-medium transition-all duration-200 ease-in disabled:cursor-not-allowed disabled:opacity-70',
					{
						[`${Color[color]}`]: color,
						[`${ButtonSize[buttonSize]}`]: buttonSize,
						[`${Size[size]}`]: size,
						[hoverStyle]: hoverTranslate
					},
					className
				)}
				aria-label={`${text}`}
				title={`${text}`}
				state={state} // Corregido el anidamiento del objeto
				to={to}
				replace={replace}
				{...props}
			>
				{icon}
				{text}
			</Link>
		)
	}
)

LinkAsButton.displayName = 'LinkAsButton'
