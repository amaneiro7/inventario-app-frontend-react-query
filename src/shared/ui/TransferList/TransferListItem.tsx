import { memo } from 'react'
import { CloseIcon } from '@/shared/ui/icon/CloseIcon'
import { cn } from '@/shared/lib/utils'
import Typography from '../Typography'

export const TransferListItem = memo(
	({
		id,
		name,
		description,
		isLoading = false,
		readOnly = false,
		onRemove
	}: {
		id: string
		name?: string
		description?: string
		isLoading?: boolean
		readOnly?: boolean
		onRemove: (id: string) => void
	}) => {
		return (
			<li
				key={id}
				className={cn(
					'flex items-center justify-between px-4 py-2 odd:bg-slate-100 even:bg-slate-200',
					isLoading && 'animate-pulse-medium text-transparent'
				)}
			>
				<Typography variant="p" className="flex flex-col gap-1">
					<span className="text-sm font-medium text-gray-900">{name}</span>
					{description && <span className="text-xs text-gray-500">{description}</span>}
				</Typography>
				<button
					className={cn(
						'cursor-pointer rounded-full p-1 text-black transition-colors hover:bg-slate-300 focus:outline-hidden disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent'
					)}
					type="button"
					onClick={() => onRemove(id)}
					title="Eliminar elemento de la lista"
					disabled={readOnly}
				>
					<CloseIcon className="h-4 w-4" />
				</button>
			</li>
		)
	}
)

TransferListItem.displayName = 'TransferListItem'
