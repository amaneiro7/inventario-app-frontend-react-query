import { cn } from '@/shared/lib/utils'

export const useSearchClasses = ({ isDisabled }: { isDisabled: boolean }) => {
	const linkClasses = cn('absolute h-10 w-full', {
		'cursor-not-allowed': isDisabled,
		'cursor-pointer': !isDisabled
	})

	const iconClasses = cn('aspect-square stroke-white h-11 stroke-[3px]')

	const spanClasses = cn(
		'relative -left-1 top-1 grid h-10 place-content-center self-start rounded-e-full px-4 py-2',
		{
			'bg-azul hover:bg-azul-900 transition-colors': !isDisabled, // Apply disabled background color
			'bg-azul/90': isDisabled // Apply disabled background color
		}
	)

	return {
		linkClasses,
		iconClasses,
		spanClasses
	}
}
