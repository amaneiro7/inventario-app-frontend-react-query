import { lazy, Suspense, useCallback, useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllModel } from '@/core/model/models/infra/hook/useGetAllModel'
import { type ModelFilters } from '@/core/model/models/application/CreateModelsQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

interface SearchProps {
	value?: string
	name: string
	categoryId?: string
	brandId?: string
	method?: 'search'
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
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
	readonly?: boolean
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
	readonly = false,
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

	const handleChangeValue = useCallback(
		async (name: string, value: string | number) => {
			if (method === 'form') {
				const data = options.find(model => model.id === value) // Optional chaining
				await (props as FormProps).handleFormChange({
					// Type assertion for FormProps
					value: `${value}`,
					memoryRamSlotQuantity: data?.modelComputer?.memoryRamSlotQuantity,
					memoryRamType: data?.modelComputer?.memoryRamType.name ?? '',
					generic: data?.generic ?? undefined
				})
			} else {
				;(props as SearchProps).handleChange(name, value) // Type assertion for SearchProps
			}
		},
		[options, method]
	)

	const render = useMemo(() => {
		const id = 'modelId'
		const label = 'Modelos'
		if (readonly) {
			const initialValue = options.find(model => model.id === value)
			return (
				<Suspense>
					<Input
						id={id}
						label={label}
						value={initialValue?.name ?? ''}
						required
						name={name}
						readOnly
						tabIndex={-1}
						aria-readonly
					/>
				</Suspense>
			)
		}
		return (
			<Suspense>
				<Combobox
					id={id}
					label={label}
					value={value}
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
			</Suspense>
		)
	}, [readonly, value, inputValue, isLoading, required, disabled, error, handleChangeValue, name])

	return <>{render}</>
}
