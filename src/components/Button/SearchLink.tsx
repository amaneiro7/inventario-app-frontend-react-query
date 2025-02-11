import { lazy, memo } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface Props extends LinkProps {
	title: string
	isDisabled?: boolean
}

const SearchIcon = lazy(async () =>
	import('@/icon/SearchIcon').then(m => ({ default: m.SearchIcon }))
)
function Component({ to, title, isDisabled, ...props }: Props) {
	return (
		<span className="grid place-content-center bg-secondary relative px-4 py-2 rounded-e-full">
			<Link
				className={`absolute w-full h-full ${
					isDisabled ? 'cursor-default' : 'cursor-pointer'
				}`}
				to={isDisabled ? '#' : to}
				title={title}
				aria-disabled={isDisabled}
				{...props}
			/>
			<SearchIcon
				width={24}
				className={`aspect-square ${
					isDisabled ? 'stroke-white' : 'stroke-white'
				} stroke-[3px]`}
			/>
		</span>
	)
}

export const SearchLink = memo(Component)
