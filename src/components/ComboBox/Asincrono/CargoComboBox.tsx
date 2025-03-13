import { useMemo, useState } from 'react'
import { useGetAllCargo } from '@/core/employee/cargo/infra/hook/useGetAllCargo'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import { Combobox } from '@/components/Input/Combobox'
import { CargoDto } from '@/core/employee/cargo/domain/dto/Cargo.dto'
import Typography from '@/components/Typography'
import { CloseIcon } from '@/icon/CloseIcon'

export function CargoCombobox({
	value: cargos = [],
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	onAddCargo,
	onRemoveCargo
}: {
	value?: CargoDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	onAddCargo: (name: 'addCargo', value: string) => void
	onRemoveCargo: (name: 'removeCargo', value: string) => void
}) {
	const [inputValue, setInputValue] = useState('')

	const { cargos: allCargos, isLoading } = useGetAllCargo({})

	const options = useMemo(
		() => allCargos?.data?.filter(cargo => !cargos.includes(cargo.id)) ?? [],
		[allCargos, cargos]
	)

	const filteredOptions = useFilterOptions({ inputValue, options })

	const handleAddCargo = (cargoId: string) => {
		onAddCargo('addCargo', cargoId)
	}

	const handleRemoveCargo = (cargoId: string) => {
		onRemoveCargo('removeCargo', cargoId)
	}

	return (
		<>
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
				onInputChange={value => {
					setInputValue(value)
				}}
				onChangeValue={(_name, value) => handleAddCargo(value)}
				readOnly={readonly}
			/>
			<div className="flex flex-wrap gap-2 mt-2">
				{cargos.length > 0 ? (
					<ul className="list-disc list-inside">
						{cargos.map(cargoId => {
							const cargo = allCargos?.data?.find(c => c.id === cargoId)
							return (
								<li key={cargoId} className="flex items-center justify-between">
									<span>{cargo?.name ?? cargoId}</span>
									<button
										className="text-red-500 hover:text-red-700 focus:outline-none"
										type="button"
										onClick={() => handleRemoveCargo(cargoId)}
									>
										<CloseIcon className="h-4 w-4" />
									</button>
								</li>
							)
						})}
					</ul>
				) : (
					<Typography variant="p" color="gris">
						No se han seleccionado cargos.
					</Typography>
				)}
			</div>
		</>
	)
}
