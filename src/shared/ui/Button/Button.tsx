import { memo } from 'react'
import { Color, Size, ButtonSize } from './styles'
import { cn } from '@/shared/lib/utils'

interface Props
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	text: string
	srOnly?: boolean
	color: keyof typeof Color
	size: keyof typeof Size
	buttonSize: keyof typeof ButtonSize
	className?: string
	hoverTranslation?: boolean
	icon?: React.JSX.Element | null
}

const hoverStyle = 'hover:shadow-lg disabled:translate-y-0 hover:-translate-y-1'

function Button({
	text,
	hoverTranslation,
	icon,
	className,
	buttonSize,
	size,
	color,
	srOnly = false,
	...props
}: Props) {
	return (
		<button
			className={cn(
				'text-b flex cursor-pointer items-center justify-center gap-2 rounded-md border border-solid font-medium transition-all duration-200 ease-in disabled:cursor-not-allowed disabled:opacity-70',
				{
					[`${Color[color]}`]: color,
					[`${ButtonSize[buttonSize]}`]: buttonSize,
					[`${Size[size]}`]: size,
					[hoverStyle]: hoverTranslation
				},
				className
			)}
			aria-label={`${text}`}
			title={`${text}`}
			{...props}
		>
			{icon}
			<span className={cn(srOnly && 'sr-only')}>{text}</span>
		</button>
	)
}

export default memo(Button)
