import { Suspense, lazy } from 'react'
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'
import { type BackgroundType, type ColorType } from '../Typography/types'

const TableCellWithUrl = lazy(() =>
	import('./TableCellWithUrl').then(m => ({ default: m.TableCellWithUrl }))
)
const TableCellText = lazy(() =>
	import('./TableCellText').then(m => ({ default: m.TableCellText }))
)
const Tag = lazy(() => import('../Tag').then(m => ({ default: m.Tag })))

interface Props<T>
	extends React.DetailedHTMLProps<
		React.TdHTMLAttributes<HTMLTableCellElement>,
		HTMLTableCellElement
	> {
	value: string | number
	url?: string
	state?: T
	tag?: boolean
	color?: ColorType
	backgroundColor?: BackgroundType
	size: keyof typeof Size
	align?: AlignType
}

const Size = {
	auto: 'w-auto', // auto
	xxSmall: 'max-w-8 min-w-8 w-8', // 32px
	xSmall: 'max-w-20 min-w-20 w-20', // 80px
	small: 'max-w-28 min-w-28 w-28', // 112px
	medium: 'max-w-36 min-w-36 w-36', // 144px
	large: 'max-w-44 min-w-44 w-44', // 176px
	xLarge: 'max-w-52 min-w-52 w-52', // 224px
	xxLarge: 'max-w-60 min-w-60 w-60' // 256px
} as const
type AlignType = 'left' | 'center' | 'right'

export function TableCell<T>({
	value,
	url,
	state,
	size,
	tag = false,
	className,
	align = 'left',
	color = 'black',
	backgroundColor = 'white',
	...props
}: React.PropsWithChildren<Props<T>>) {
	const classes = twMerge(
		'min-h-8 h-8 p-0 text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis border-b-2 border-b-gray-300 ',
		cn({
			[`${Size[size]}`]: size
		}),
		className
	)
	return (
		<td
			role="cell"
			tabIndex={-1}
			data-key={value}
			className={classes}
			aria-label={`${value}`}
			title={`${value}`}
			{...props}
		>
			{url ? (
				<Suspense>
					<TableCellWithUrl align={align} value={value} url={url} state={state} />
				</Suspense>
			) : tag ? (
				<Suspense>
					<Tag
						align={align}
						backgroundColor={backgroundColor}
						color={color}
						option="tiny"
						iconText={value ?? ''}
					/>
				</Suspense>
			) : (
				<Suspense>
					<TableCellText align={align} value={value} />
				</Suspense>
			)}
		</td>
	)
}
