import { memo, useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllModel } from '@/core/model/models/infra/hook/useGetAllModel'
import { Combobox } from '@/components/Input/Combobox'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'
interface BaseProps {
	value?: string
	name: string
	categoryId?: string
	mainCategoryId?: string
	brandId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
}
interface SearchProps extends BaseProps {
	method?: 'search'
	handleChange: (name: string, value: string | number) => void
}

interface FormProps extends BaseProps {
	method?: 'form'
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

export const ModelCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	categoryId,
	mainCategoryId,
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
			mainCategoryId,
			categoryId,
			brandId
		}
	}, [debouncedSearch, value, name, mainCategoryId, categoryId, brandId])

	const { models, isLoading } = useGetAllModel({ query })
	const options = useMemo(() => models?.data ?? [], [models])

	const getModelsData = useCallback(
		(value: string | number) => {
			return options.find(model => model.id === value)
		},
		[options]
	)

	const handleChangeValue = useCallback(
		(name: string, value: string | number) => {
			if (method === 'form' && 'handleFormChange' in props) {
				const data = getModelsData(value)
				props.handleFormChange({
					value: `${value}`,
					memoryRamSlotQuantity:
						data?.modelComputer?.memoryRamSlotQuantity ??
						data?.modelLaptop?.memoryRamSlotQuantity,
					memoryRamType:
						data?.modelComputer?.memoryRamType.name ??
						data?.modelLaptop?.memoryRamType.name ??
						'',
					generic: data?.generic ?? undefined
				})
			} else if (method === 'search' && 'handleChange' in props) {
				props.handleChange(name, value)
			}
		},
		[options, method, props]
	)

	return (
		<>
			<Combobox
				id="modelId"
				label="Modelos"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={options}
				onChangeValue={handleChangeValue}
				onInputChange={setInputValue}
				readOnly={readonly}
			/>
		</>
	)
})
