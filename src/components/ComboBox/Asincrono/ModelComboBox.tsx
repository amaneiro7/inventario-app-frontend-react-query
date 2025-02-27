import { lazy, useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllModel } from '@/core/model/models/infra/hook/useGetAllModel'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

interface SearchProps {
	value?: string
	name: string
	categoryId?: string
	brandId?: string
	method?: 'search'
	error?: string
	required?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}

interface FormProps {
	value?: string
	name: string
	categoryId?: string
	brandId?: string
	method?: 'form'
	error?: string
	required?: boolean
	disabled?: boolean
	handleFormChange: ({
		value,
		memoryRamSlotQuantity,
		memoryRamType,
		generic
	}: {
		value: string
		memoryRamSlotQuantity?: number
		memoryRamType?: string
		generic?: boolean
	}) => Promise<void>
}

type Props = SearchProps | FormProps

export function ModelCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	categoryId,
	brandId,
	method = 'search',
	...props
}: Props) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	const query: ModelFilters = useMemo(() => {
		return {
			...(value ? { id: value } : { id: undefined }),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 }),
			categoryId,
			brandId
		}
	}, [debouncedSearch, value, name, categoryId, brandId])

	const { models, isLoading } = useGetAllModel(query)
	const options = useMemo(() => models?.data ?? [], [models])

	const handleChangeValue = useCallback(async (name: string, value: string | number) => {
		if (method === 'form') {
			const data = options.find(model => model.id === value) // Optional chaining
			await (props as FormProps).handleFormChange({
				// Type assertion for FormProps
				value: `${value}`,
				memoryRamSlotQuantity: data?.modelComputer?.memoryRamSlotQuantity,
				memoryRamType: data?.modelComputer?.memoryRamTypeId ?? '',
				generic: data?.generic ?? undefined
			})
		} else {
			;(props as SearchProps).handleChange(name, value) // Type assertion for SearchProps
		}
	}, [])

	return (
		<>
			<Combobox
				id="modelId"
				value={value}
				label="Modelos"
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={models?.data ?? []}
				onChangeValue={handleChangeValue}
				onInputChange={value => {
					setInputValue(value)
				}}
			/>
		</>
	)
}
