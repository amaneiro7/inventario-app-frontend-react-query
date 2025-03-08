import { lazy, memo, Suspense, useMemo } from 'react'
import { useGetAllMainCategory } from '@/core/mainCategory/infra/hook/useGetAllMainCategory'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

export const MainCategoryCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	name: string
	error?: string
	required?: boolean
	readonly?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { mainCategories, isLoading } = useGetAllMainCategory({})

	const options = useMemo(() => mainCategories?.data ?? [], [mainCategories])

	const render = useMemo(() => {
		const id = 'mainCategory'
		const label = 'Categoria'

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
					id="mainCategory"
					label="Categoria"
					value={value}
					name={name}
					loading={isLoading}
					options={options}
					required={required}
					disabled={disabled}
					error={!!error}
					errorMessage={error}
					searchField={false}
					readOnly={readonly}
					onChangeValue={handleChange}
				/>
			</Suspense>
		)
	}, [readonly, value, mainCategories, isLoading, required, disabled, error, handleChange, name])

	return <>{render}</>
})
