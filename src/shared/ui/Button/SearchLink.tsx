import { memo } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { SearchIcon } from '@/shared/ui/icon/SearchIcon'
import { useSearchClasses } from './useSearchClasses'

interface Props extends LinkProps {
	title: string
	isDisabled?: boolean
}
export const SearchLink = memo(function Component({
	to,
	title,
	isDisabled = true,
	...props
}: Props) {
	const { iconClasses, linkClasses, spanClasses } = useSearchClasses({ isDisabled })
	return (
		<span className={spanClasses}>
			<Link
				className={linkClasses}
				to={isDisabled ? '#' : to}
				title={title}
				aria-disabled={isDisabled}
				{...props}
			/>
			<SearchIcon className={iconClasses} />
		</span>
	)
})

SearchLink.displayName = 'SearchLink'
