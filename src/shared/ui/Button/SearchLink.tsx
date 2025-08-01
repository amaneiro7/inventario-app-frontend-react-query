import { memo } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { SearchIcon } from '@/shared/ui/icon/SearchIcon'
import { cn } from '@/shared/lib/utils'

interface Props extends LinkProps {
	title: string
	isDisabled?: boolean
}
export const SearchLink = memo(function Component({ to, title, isDisabled, ...props }: Props) {
	const linkClasses = cn('absolute h-11 w-full', {
		'cursor-not-allowed': isDisabled,
		'cursor-pointer': !isDisabled
	})

	const iconClasses = cn('aspect-square stroke-white h-11 stroke-[3px]')

	const spanClasses = cn(
		'relative -left-0.5 grid h-11 place-content-center self-start rounded-e-full px-4 py-2',
		{
			'bg-azul hover:bg-azul-900 transition-colors': !isDisabled, // Apply disabled background color
			'bg-azul/90': isDisabled // Apply disabled background color
		}
	)
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
