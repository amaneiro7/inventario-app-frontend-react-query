import { useMemo } from 'react'
import { Combobox } from '@/components/Input/Combobox'
import { OrderTypes } from '@/core/shared/domain/criteria/OrderType'

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
	const options = useMemo(() => {
		return [
			{ id: 'operatingSystemId', name: 'Sistema Operativo' },
			{ id: 'operatingSystemArqId', name: 'Arquitectura de Sistema Operativo' },
			{ id: 'hardDriveCapacityId', name: 'Capacidad de disco duro' },
			{ id: 'hardDriveTypeId', name: 'Tipo de disco duro' },
			{ id: 'memoryRamCapacity', name: 'Memoria Ram' },
			{ id: 'regionId', name: 'Region' },
			{ id: 'stateId', name: 'Estado' },
			{ id: 'cityId', name: 'Ciudad' }
		]
	}, [])

	const orderIndicator = useMemo(() => {
		return orderType === OrderTypes.DESC
			? '▼'
			: orderType === OrderTypes.ASC || orderBy
			? '▲'
			: '' // Indicadores visuales
	}, [orderBy, orderType])

	return (
		<div className="flex items-start">
			<Combobox
				id="orderBy"
				label="Ordenar por"
				value={orderBy ?? ''}
				name={name}
				options={options}
				searchField={false}
				onChangeValue={(_name, value) => {
					// const newValue = value === 'orderBy' ? '' : value
					handleSort(value)
				}}
			/>
			<span className="transition-all min-w-3 ml-2 mt-2">{orderIndicator}</span>
		</div>
	)
}
