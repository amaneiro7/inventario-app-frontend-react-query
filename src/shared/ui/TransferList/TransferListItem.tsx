import { memo } from 'react'
import { CloseIcon } from '@/shared/ui/icon/CloseIcon'
import { cn } from '@/shared/lib/utils'

export const TransferListItem = memo(function ({
	id,
	name,
	isLoading = false,
	onRemove
}: {
	id: string
	name?: string
	isLoading?: boolean
	onRemove: (id: string) => void
}) {
	return (
		<li
			key={id}
			className={cn(
				'flex items-center justify-between px-4 py-2 odd:bg-slate-100 even:bg-slate-200',
				isLoading && 'animate-pulse-medium text-transparent'
			)}
		>
			<span>{name}</span>
			<button
				className="rounded-full p-1 text-black transition-colors hover:bg-slate-300 focus:outline-hidden"
				type="button"
				onClick={() => onRemove(id)}
				title="Eliminar elemento de la lista"
			>
				<CloseIcon className="h-4 w-4" />
			</button>
		</li>
	)
})
