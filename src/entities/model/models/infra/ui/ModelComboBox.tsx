import { memo, useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllModel } from '@/entities/model/models/infra/hook/useGetAllModel'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type ModelFilters } from '@/entities/model/models/application/CreateModelsQueryParams'

interface BaseProps {
	/**
	 * The currently selected model ID.
	 */
	value?: string
	/**
	 * The name of the input field.
	 */
	name: string
	/**
	 * The ID of the associated category, used for filtering models.
	 */
	categoryId?: string
	/**
	 * The ID of the associated main category, used for filtering models.
	 */
	mainCategoryId?: string
	/**
	 * The ID of the associated brand, used for filtering models.
	 */
	brandId?: string
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
}

interface SearchProps extends BaseProps {
	/**
	 * Specifies the method of usage for the combobox. 'search' implies it's used for filtering/searching.
	 */
	method?: 'search'
	/**
	 * Callback function triggered when the selected value changes in search mode.
	 * @param name - The name of the input field.
	 * @param value - The new selected value (model ID).
	 */
	handleChange: (name: string, value: string | number) => void
}

interface FormProps extends BaseProps {
	/**
	 * Specifies the method of usage for the combobox. 'form' implies it's used within a form for data entry.
	 */
	method?: 'form'
	/**
	 * Callback function triggered when the selected value changes in form mode.
	 * It provides detailed model information relevant to form fields.
	 * @param params - An object containing the selected model's value and specific features.
	 * @param params.value - The ID of the selected model.
	 * @param params.memoryRamSlotQuantity - The memory RAM slot quantity of the selected model.
	 * @param params.memoryRamType - The memory RAM type name of the selected model.
	 * @param params.generic - Indicates if the selected model is generic.
	 */
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

/**
 * `ModelCombobox` is a memoized functional component that provides a searchable combobox for selecting models.
 * It fetches model data based on user input and associated category, main category, and brand IDs.
 * It supports two modes: 'search' for filtering and 'form' for detailed data handling.
 */
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

	const { data: models, isLoading } = useGetAllModel({ query })
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
				void props.handleFormChange({
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
		[options, method, props, getModelsData]
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