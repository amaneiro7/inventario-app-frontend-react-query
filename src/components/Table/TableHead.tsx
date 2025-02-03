import cn from 'classnames'
import { twMerge } from 'tailwind-merge'

type Props = React.DetailedHTMLProps<
	React.ThHTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
> & {
	name: string
	size: keyof typeof Size
}

const Size = {
	xxSmall: 'w-8', // 32px
	xSmall: 'w-20', // 80px
	small: 'w-28', // 112px
	medium: 'w-36', // 144px
	large: 'w-44', // 176px
	xLarge: 'w-52' // 224px
} as const

export function TableHead({ name, size, className, ...props }: Props) {
	const classes = twMerge(
		'min-h-9 h-9 p-2 font-semibold tracking-wider text-left whitespace-nowrap capitalize',
		cn({
			[`${Size[size]}`]: size
		}),
		className
	)
	return (
		<th className={classes} {...props}>
			{name}
		</th>
	)
}
