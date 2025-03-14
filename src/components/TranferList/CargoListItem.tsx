import { memo } from 'react'
import { CloseIcon } from '@/icon/CloseIcon'

export const CargoListItem = memo(function ({
	cargoId,
	cargoName,
	onRemove
}: {
	cargoId: string
	cargoName?: string
	onRemove: (cargoId: string) => void
}) {
	return (
		<li
			key={cargoId}
			className="flex items-center justify-between px-4 py-2 even:bg-slate-100 odd:bg-slate-50 "
		>
			<span>{cargoName}</span>
			<button
				className="text-black rounded-full p-1 transition-colors hover:bg-slate-300 focus:outline-none"
				type="button"
				onClick={() => onRemove(cargoId)}
				title="Eliminar elemento de la lista"
			>
				<CloseIcon className="h-4 w-4" />
			</button>
		</li>
	)
})
