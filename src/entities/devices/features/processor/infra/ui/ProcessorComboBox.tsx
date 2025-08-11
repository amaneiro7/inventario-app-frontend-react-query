import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllProcessor } from '@/entities/devices/features/processor/infra/hooks/useGetAllProcessors'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type ProcessorFilters } from '@/entities/devices/features/processor/application/createProcessorQueryParams'

export const ProcessorCombobox = memo(
	({
		value = '',
		name,
		error = '',
		required = false,
		disabled = false,
		readonly = false,
		isLoading = false,
		modelId = '',
		handleChange
	}: {
		value?: string
		name: string
		error?: string
		modelId?: string
		required?: boolean
		disabled?: boolean
		isLoading?: boolean
		readonly?: boolean
		handleChange: (name: string, value: string | number) => void
	}) => {
		const [inputValue, setInputValue] = useState('')
		const [debouncedSearch] = useDebounce(inputValue, 250)

		const query: ProcessorFilters = useMemo(() => {
			return {
				...(value ? { id: value } : {}),
				...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 }),
				...(value || debouncedSearch ? { modelId: undefined } : { modelId })
			}
		}, [debouncedSearch, value, modelId])

		const { data, isLoading: loading } = useGetAllProcessor(query)

		const options = useMemo(() => data?.data ?? [], [data])

		return (
			<>
				<Combobox
					id="processor"
					label="Procesadores"
					value={value}
					inputValue={inputValue}
					name={name}
					required={required}
					disabled={disabled}
					error={!!error}
					errorMessage={error}
					loading={loading}
					isLoading={isLoading}
					options={options}
					onInputChange={setInputValue}
					onChangeValue={handleChange}
					readOnly={readonly}
				/>
			</>
		)
	}
)
