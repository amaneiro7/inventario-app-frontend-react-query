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
			{ id: 'departamentoId', name: 'Por departamento' },
			{ id: 'cargoId', name: 'Por cargo' },
			{ id: 'operatingSystemId', name: 'Por Sistema Operativo' },
			{ id: 'operatingSystemArqId', name: 'Por Arquitectura de Sistema Operativo' },
			{ id: 'hardDriveCapacityId', name: 'Por Capacidad de disco duro' },
			{ id: 'hardDriveTypeId', name: 'Por Tipo de disco duro' },
			{ id: 'memoryRamCapacity', name: 'Por Memoria Ram' },
			{ id: 'regionId', name: 'Por Region' },
			{ id: 'stateId', name: 'Por Estado' },
			{ id: 'cityId', name: 'Por Ciudad' }
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
