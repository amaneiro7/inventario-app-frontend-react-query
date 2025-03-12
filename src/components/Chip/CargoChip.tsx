import { type CargoId } from '@/core/employee/cargo/domain/value-object/CargoId'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { Chip } from '.'
import { queryClient } from '@/lib/queryCliente'

export default function CargoChip({
	cargos,
	onDelete
}: {
	cargos: Primitives<CargoId>[]
	onDelete: () => void
}) {
	const data = queryClient.getQueryData('cargos')
	console.log(data)
	return (
		<div className="flex flex-wrap gap-2 mt-2">
			{cargos.map(cargo => (
				<Chip key={cargo} label="" onDelete={onDelete} />
			))}
		</div>
	)
}
