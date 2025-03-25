import { memo } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { SearchIcon } from '@/icon/SearchIcon'

interface Props extends LinkProps {
	title: string
	isDisabled?: boolean
}
export const SearchLink = memo(function Component({ to, title, isDisabled, ...props }: Props) {
	return (
		<span className="-left-1 h-11 self-start grid place-content-center bg-azul relative px-4 py-2 rounded-e-full">
			<Link
				className={`absolute w-full h-11 ${
					isDisabled ? 'cursor-default' : 'cursor-pointer'
				}`}
				to={isDisabled ? '#' : to}
				title={title}
				aria-disabled={isDisabled}
				{...props}
			/>
			<SearchIcon
				className={`h-11 aspect-square ${
					isDisabled ? 'stroke-white' : 'stroke-white'
				} stroke-[3px]`}
			/>
		</span>
	)
})
