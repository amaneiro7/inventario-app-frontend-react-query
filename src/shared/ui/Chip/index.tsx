import { memo } from 'react'
import { CloseIcon } from '@/shared/ui/icon/CloseIcon'

interface ChipProps {
	label: string
	onDelete?: () => void
}

export const Chip = memo(function ({ label, onDelete }: ChipProps) {
	return (
		<div className="mr-2 mb-2 inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
			<span>{label}</span>
			{onDelete && (
				<button
					className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-hidden"
					onClick={onDelete}
				>
					<CloseIcon className="h-4 w-4" />
				</button>
			)}
		</div>
	)
})

Chip.displayName = 'Chip'
