import { lazy, memo, Suspense, useMemo } from 'react'
import { useGetAllVicepresidenciaEjecutivas } from '@/core/employee/vicepresidenciaEjecutiva/infra/hook/useGetAllVicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaFilters } from '@/core/employee/vicepresidenciaEjecutiva/application/createVicepresidenciaEjecutivaQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

export const VicepresidenciaEjecutivaCombobox = memo(function ({
	value = '',
	name,
	directivaId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	handleChange
}: {
	value?: string
	directivaId?: string
	name: string
	error?: string
	required?: boolean
	readonly?: boolean
	disabled?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const query: VicepresidenciaEjecutivaFilters = useMemo(
		() => ({
			...(value ? { id: value } : {}),
			directivaId
		}),
		[value, directivaId]
	)

	const { vicepresidenciaEjecutivas, isLoading } = useGetAllVicepresidenciaEjecutivas(query)

	const options = useMemo(
		() => vicepresidenciaEjecutivas?.data ?? [],
		[vicepresidenciaEjecutivas]
	)

	const render = useMemo(() => {
		const id = 'VicepresidenciaEjecutiva'
		const label = 'Vicepresidencia Ejecutiva'

		if (readonly) {
			const initialValue = options.find(vpe => vpe.id === value)
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
					readOnly={readonly}
					onChangeValue={handleChange}
				/>
			</Suspense>
		)
	}, [
		readonly,
		value,
		vicepresidenciaEjecutivas,
		directivaId,
		isLoading,
		required,
		disabled,
		error,
		handleChange,
		name
	])

	return <>{render}</>
})
