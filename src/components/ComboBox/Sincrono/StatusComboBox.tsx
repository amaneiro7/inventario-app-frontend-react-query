import { lazy, memo, Suspense, useMemo, useState } from 'react'
import { useGetAllStatus } from '@/hooks/getAll/useGetAllStatus'

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
		const { status, isLoading } = useGetAllStatus({
			options: {
				id: value
			}
		})

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
					onInputChange={e => {
						setInputValue(e.target.value)
					}}
					onChangeValue={handleChange}
				/>
			</Suspense>
		)
	}
)
