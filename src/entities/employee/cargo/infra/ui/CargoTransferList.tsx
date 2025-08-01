import { useCallback, useMemo, useState } from 'react'
import { useGetAllCargo } from '@/entities/employee/cargo/infra/hook/useGetAllCargo'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '../../../../../shared/ui/TransferList/TransferListItem'
import { type CargoDto } from '@/entities/employee/cargo/domain/dto/Cargo.dto'

interface CargoTransferListProps {
	value?: CargoDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	onAddCargo: (name: 'addCargo', value: string) => void
	onRemoveCargo: (name: 'removeCargo', value: string) => void
}

export function CargoTransferList({
	value: cargos = [],
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	onAddCargo,
	onRemoveCargo
}: CargoTransferListProps) {
	const [inputValue, setInputValue] = useState('')
	const { cargos: allCargos, isLoading } = useGetAllCargo({})

	const availableOptions = useMemo(
		() => allCargos?.data?.filter(cargo => !cargos.includes(cargo.id)) ?? [],
		[allCargos, cargos]
	)

	const filteredOptions = useFilterOptions({ inputValue, options: availableOptions })

	const handleAddCargo = useCallback(
		(cargoId: string) => {
			onAddCargo('addCargo', cargoId)
		},
		[onAddCargo]
	)

	const handleRemoveCargo = useCallback(
		(cargoId: string) => {
			onRemoveCargo('removeCargo', cargoId)
		},
		[onRemoveCargo]
	)

	return (
		<div className="grid items-start justify-between gap-4 md:grid-cols-2">
			<Combobox
				id="CargoId"
				label="Cargos"
				value=""
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={filteredOptions}
				onInputChange={setInputValue}
				onChangeValue={(_name, value) => handleAddCargo(value)}
				readOnly={readonly}
			/>
			<div className="rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
					Cargo Seleccionados
				</Typography>
				{cargos.length > 0 ? (
					<ul role="options" className="flex w-full flex-col rounded">
						{cargos.map(cargoId => {
							const cargo = allCargos?.data?.find(c => c.id === cargoId)
							return (
								<TransferListItem
									key={cargoId}
									id={cargoId}
									name={cargo?.name}
									onRemove={handleRemoveCargo}
								/>
							)
						})}
					</ul>
				) : (
					<Typography className="p-2" variant="p" color="gris">
						No se han seleccionado cargos.
					</Typography>
				)}
			</div>
		</div>
	)
}
