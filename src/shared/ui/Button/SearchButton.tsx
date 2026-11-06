import { memo } from 'react'
import { SearchIcon } from '@/shared/ui/icon/SearchIcon'
import { useSearchClasses } from './useSearchClasses'

interface Props extends React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> {
	title: string
	isDisabled?: boolean
}
export const SearchButton = memo(function Component({ title, isDisabled = true, ...props }: Props) {
	const { iconClasses, linkClasses, spanClasses } = useSearchClasses({ isDisabled })
	return (
		<span className={spanClasses}>
			<button
				className={linkClasses}
				title={title}
				disabled={isDisabled}
				aria-disabled={isDisabled}
				{...props}
			/>
			<SearchIcon className={iconClasses} />
		</span>
	)
})

SearchButton.displayName = 'SearchButton'
