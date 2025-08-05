import { useCallback, useMemo, useState } from 'react'
import { useGetAllCargo } from '@/entities/employee/cargo/infra/hook/useGetAllCargo'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '../../../../../shared/ui/TransferList/TransferListItem'
import { type CargoDto } from '@/entities/employee/cargo/domain/dto/Cargo.dto'

interface CargoTransferListProps {
	/**
	 * An array of selected cargo IDs.
	 */
	value?: CargoDto['id'][]
	/**
	 * The name of the input field.
	 */
	name: string
	/**
	 * Error message to display, if any.
	 */
	error?: string
	/**
	 * Whether the input is required.
	 */
	required?: boolean
	/**
	 * Whether the input is disabled.
	 */
	disabled?: boolean
	/**
	 * Whether the input is read-only.
	 */
	readonly?: boolean
	/**
	 * Callback function triggered when a cargo is added to the list.
	 * @param name - The name of the action ('addCargo').
	 * @param value - The ID of the cargo to add.
	 */
	onAddCargo: (name: 'addCargo', value: string) => void
	/**
	 * Callback function triggered when a cargo is removed from the list.
	 * @param name - The name of the action ('removeCargo').
	 * @param value - The ID of the cargo to remove.
	 */
	onRemoveCargo: (name: 'removeCargo', value: string) => void
}

/**
 * `CargoTransferList` is a functional component that provides a dual-list interface
 * for selecting and managing cargos. It allows users to search for available cargos
 * and add/remove them from a selected list.
 */
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
	const { data: allCargos, isLoading } = useGetAllCargo({})

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