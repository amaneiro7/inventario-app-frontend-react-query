import { lazy, Suspense, useMemo } from 'react'
import { useGetAllRegion } from '@/core/locations/region/infra/hook/useGetAllRegion'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

export function RegionCombobox({
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
	const { regions, isLoading } = useGetAllRegion({})

	const options = useMemo(() => regions?.data ?? [], [regions])

	const render = useMemo(() => {
		const id = 'regionId'
		const label = 'Región'

		if (readonly) {
			const initialValue = options.find(region => region.id === value)
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
				/>
			</Suspense>
		)
	}, [readonly, value, regions, isLoading, required, disabled, error, handleChange, name])

	return <>{render}</>
}
