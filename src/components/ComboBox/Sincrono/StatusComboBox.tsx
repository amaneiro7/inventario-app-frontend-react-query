import { lazy, memo, Suspense, useMemo, useState } from 'react'
import { useGetAllStatus } from '@/core/status/infra/hook/useGetAllStatus'
import { StatusFilters } from '@/core/status/application/createStatusQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export const StatusCombobox = memo(
	({
		value = '',
		name,
		handleChange
	}: {
		value?: string
		name: string

		handleChange: (name: string, value: string | number) => void
	}) => {
		const query: StatusFilters = useMemo(() => {
			return {
				...(value ? { id: value } : {})
			}
		}, [value])
		const { status, isLoading } = useGetAllStatus(query)

		const [inputValue, setInputValue] = useState('')

		const options = useMemo(() => status?.data ?? [], [status])

		return (
			<Suspense fallback={<div>Loading...</div>}>
				<Combobox
					loading={isLoading}
					label="Estatus"
					name={name}
					value={value}
					options={options}
					inputValue={inputValue}
					onInputChange={value => {
						setInputValue(value)
					}}
					onChangeValue={handleChange}
				/>
			</Suspense>
		)
	}
)
