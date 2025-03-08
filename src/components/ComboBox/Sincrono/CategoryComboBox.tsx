import { lazy, memo, Suspense, useMemo, useState } from 'react'
import { useGetAllCategory } from '@/core/category/infra/hook/useGetAllCategory'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { type CategoryFilters } from '@/core/category/application/CreateCategoryQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

export const CategoryCombobox = memo(function ({
	value = '',
	name,
	mainCategoryId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	mainCategoryId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: CategoryFilters = useMemo(
		() => ({
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {}),
			mainCategoryId
		}),
		[debouncedSearch, value, mainCategoryId]
	)

	const { categories, isLoading } = useGetAllCategory(query)

	const options = useMemo(() => categories?.data ?? [], [categories])

	const render = useMemo(() => {
		const id = 'category'
		const label = 'SubCategoria'

		if (readonly) {
			const initialValue = options.find(category => category.id === value)
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
					loading={isLoading}
					options={options}
					required={required}
					disabled={disabled}
					error={!!error}
					errorMessage={error}
					searchField={false}
					onInputChange={value => {
						setInputValue(value)
					}}
					onChangeValue={handleChange}
					readOnly={readonly}
				/>
			</Suspense>
		)
	}, [
		readonly,
		value,
		categories,
		inputValue,
		isLoading,
		required,
		disabled,
		error,
		handleChange,
		name
	])

	return <>{render}</>
})
