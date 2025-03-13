import { useMemo, useState } from 'react'
import { useGetAllCargo } from '@/core/employee/cargo/infra/hook/useGetAllCargo'
import { useFilterOptions } from '@/hooks/useFilterOptions'
import { Combobox } from '@/components/Input/Combobox'
import { CargoDto } from '@/core/employee/cargo/domain/dto/Cargo.dto'
import Typography from '@/components/Typography'
import { CloseIcon } from '@/icon/CloseIcon'

export function CargoTransferList({
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
		<div className="grid md:grid-cols-2 gap-4 items-start justify-between">
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
			<div className="rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="w-full rounded-t px-4 py-2 bg-azul">
					Cargo Seleccionados
				</Typography>
				{cargos.length > 0 ? (
					<ul role="options" className="flex flex-col w-full rounded">
						{cargos.map(cargoId => {
							const cargo = allCargos?.data?.find(c => c.id === cargoId)
							console.group()
							console.log('cargos', cargos)
							console.log('Allcargos', allCargos)
							console.log('cargoID', cargoId)
							console.log('cargo', cargo)
							console.groupEnd()
							return (
								<li
									key={cargoId}
									className="flex items-center justify-between px-4 py-2 even:bg-slate-100 odd:bg-slate-50 "
								>
									<span>{cargo?.name}</span>
									<button
										className="text- hover:text-red-700 focus:outline-none"
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
					<Typography className="p-2" variant="p" color="gris">
						No se han seleccionado cargos.
					</Typography>
				)}
			</div>
		</div>
	)
}
