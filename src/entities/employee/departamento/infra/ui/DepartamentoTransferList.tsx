import { useCallback, useMemo, useState } from 'react'
import { useGetAllDepartamento } from '@/entities/employee/departamento/infra/hook/useGetAllDepartamento'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '../../../../../shared/ui/TransferList/TransferListItem'
import { type DepartamentoDto } from '@/entities/employee/departamento/domain/dto/Departamento.dto'

interface DepartamentoTransferListProps {
	value?: DepartamentoDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	onAddDepartamento: (name: 'addDepartamento', value: string) => void
	onRemoveDepartamento: (name: 'removeDepartamento', value: string) => void
}

export function DepartamentoTransferList({
	value: departamentos = [],
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	onAddDepartamento,
	onRemoveDepartamento
}: DepartamentoTransferListProps) {
	const [inputValue, setInputValue] = useState('')
	const { data: allDepartamento, isLoading } = useGetAllDepartamento({})

	const availableOptions = useMemo(
		() =>
			allDepartamento?.data?.filter(
				Departamento => !departamentos.includes(Departamento.id)
			) ?? [],
		[allDepartamento, departamentos]
	)

	const filteredOptions = useFilterOptions({ inputValue, options: availableOptions })

	const handleAddDepartamento = useCallback(
		(departamentoId: string) => {
			onAddDepartamento('addDepartamento', departamentoId)
		},
		[onAddDepartamento]
	)

	const handleRemoveDepartamento = useCallback(
		(departamentoId: string) => {
			onRemoveDepartamento('removeDepartamento', departamentoId)
		},
		[onRemoveDepartamento]
	)

	return (
		<div className="grid items-start justify-between gap-4 md:grid-cols-2">
			<Combobox
				id="DepartamentoId"
				label="Departamentos"
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
				onChangeValue={(_name, value) => handleAddDepartamento(value)}
				readOnly={readonly}
			/>
			<div className="rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
					Departamento Seleccionados
				</Typography>
				{departamentos.length > 0 ? (
					<ul role="options" className="flex w-full flex-col rounded">
						{departamentos.map(departamentoId => {
							const Departamento = allDepartamento?.data?.find(
								c => c.id === departamentoId
							)
							return (
								<TransferListItem
									key={departamentoId}
									id={departamentoId}
									name={Departamento?.name}
									onRemove={handleRemoveDepartamento}
								/>
							)
						})}
					</ul>
				) : (
					<Typography className="p-2" variant="p" color="gris">
						No se han seleccionado Departamentos.
					</Typography>
				)}
			</div>
		</div>
	)
}
