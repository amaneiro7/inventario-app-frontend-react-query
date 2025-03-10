import { lazy, memo, Suspense, useMemo } from 'react'
import { useGetAllTypeOfSite } from '@/core/locations/typeOfSites/infra/hook/useGetAllTypeOfSite'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

export const TypeOfSiteCombobox = memo(function ({
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
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const { typeOfSites, isLoading } = useGetAllTypeOfSite({})

	const options = useMemo(() => typeOfSites?.data ?? [], [typeOfSites])

	const render = useMemo(() => {
		const id = 'typeOfSite'
		const label = 'Tipo de Sitio'

		if (readonly) {
			const initialValue = options.find(typeOfSite => typeOfSite.id === value)
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
					name={name}
					loading={isLoading}
					options={options}
					required={required}
					disabled={disabled}
					error={!!error}
					errorMessage={error}
					searchField={false}
					onChangeValue={handleChange}
					readOnly={readonly}
				/>
			</Suspense>
		)
	}, [readonly, value, typeOfSites, isLoading, required, disabled, error, name, handleChange])

	return <>{render}</>
})
