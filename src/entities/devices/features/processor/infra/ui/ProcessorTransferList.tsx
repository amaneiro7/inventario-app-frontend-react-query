import { useCallback, useMemo, useState } from 'react'
import { useGetAllProcessor } from '@/entities/devices/features/processor/infra/hooks/useGetAllProcessors'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '@/shared/ui/TransferList/TransferListItem'
import { type ProcessorDto } from '@/entities/devices/features/processor/domain/dto/Processor.dto'

interface ProcessorTransferListProps {
	value?: ProcessorDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	onAddProcessor: (name: 'addProcessor', value: string) => void
	onRemoveProcessor: (name: 'removeProcessor', value: string) => void
}

export function ProcessorTransferList({
	value: processors = [],
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	onAddProcessor,
	onRemoveProcessor
}: ProcessorTransferListProps) {
	const [inputValue, setInputValue] = useState('')
	const { data: allProcessors, isLoading: loading } = useGetAllProcessor({})

	const availableOptions = useMemo(
		() => allProcessors?.data?.filter(processor => !processors.includes(processor.id)) ?? [],
		[allProcessors, processors]
	)

	const filteredOptions = useFilterOptions({ inputValue, options: availableOptions })

	const handleAddProcessor = useCallback(
		(processorId: string) => {
			onAddProcessor('addProcessor', processorId)
		},
		[onAddProcessor]
	)

	const handleRemoveProcessor = useCallback(
		(processorId: string) => {
			onRemoveProcessor('removeProcessor', processorId)
		},
		[onRemoveProcessor]
	)

	return (
		<div className="grid items-start justify-between gap-4 md:grid-cols-2">
			<Combobox
				id="ProcessorId"
				label="Procesadores"
				value=""
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={loading}
				isLoading={isLoading}
				options={filteredOptions}
				onInputChange={setInputValue}
				onChangeValue={(_name, value) => handleAddProcessor(value)}
				readOnly={readonly}
			/>
			<div className="rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
					Procesadores Seleccionados
				</Typography>
				{processors.length > 0 ? (
					<ul role="options" className="flex w-full flex-col rounded">
						{processors.map(processorId => {
							const cargo = allProcessors?.data?.find(c => c.id === processorId)
							return (
								<TransferListItem
									key={processorId}
									id={processorId}
									name={cargo?.name}
									isLoading={isLoading}
									readOnly={readonly}
									onRemove={handleRemoveProcessor}
								/>
							)
						})}
					</ul>
				) : (
					<Typography className="p-2" variant="p" color="gris">
						No se han seleccionado procesadores.
					</Typography>
				)}
			</div>
		</div>
	)
}
