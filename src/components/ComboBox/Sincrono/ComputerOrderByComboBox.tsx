import { useMemo } from 'react'
import { Combobox } from '@/components/Input/Combobox'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'

const options = [
	{ id: 'operatingSystemId', name: 'Sistema Operativo' },
	{ id: 'operatingSystemArqId', name: 'Arquitectura S.O.' },
	{ id: 'hardDriveCapacityId', name: 'Capacidad Disco' },
	{ id: 'hardDriveTypeId', name: 'Tipo Disco' },
	{ id: 'memoryRamCapacity', name: 'Ram' },
	{ id: 'cargoId', name: 'Cargo' },
	{ id: 'departamentoId', name: 'Departamento' },
	{ id: 'vicepresidenciaId', name: 'Vicepresidencia' },
	{ id: 'vicepresidenciaEjecutivaId', name: 'Vicepresidencia Ejecutiva' },
	{ id: 'directivaId', name: 'Directiva' },
	{ id: 'administrativeRegionId', name: 'Region Administrativa' },
	{ id: 'regionId', name: 'Region' },
	{ id: 'stateId', name: 'Estado' },
	{ id: 'cityId', name: 'Ciudad' }
]

export function ComputerOrderByCombobox({
	orderBy,
	orderType,
	name,
	handleSort
}: {
	orderBy?: string
	orderType?: string
	name: string
	handleSort: (field: string) => void
}) {
	const selectedOptionWithIndicator = useMemo(() => {
		return options.map(option => {
			if (option.id === orderBy) {
				const indicator = orderType === OrderTypes.DESC ? ' ▼' : ' ▲'
				return { ...option, name: `${'✓ '}${option.name}${indicator}` }
			}
			return option
		})
	}, [orderBy, orderType])

	const isSomeSelected = useMemo(() => options.find(opt => opt.id === orderBy)?.id, [orderBy])

	return (
		<div className="flex items-start">
			<Combobox
				id="orderBy"
				label="Ordenar por"
				value={isSomeSelected ?? ''}
				name={name}
				options={selectedOptionWithIndicator}
				searchField={false}
				onChangeValue={(_name, value) => {
					handleSort(value)
				}}
			/>
		</div>
	)
}
