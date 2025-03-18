import { memo, useState, useCallback } from 'react'
import { Input } from '@/components/Input/Input'
import { EmployeeExtension } from '@/core/employee/employee/domain/value-object/EmployeeExtension'

interface ExtensionInputProps {
	value: string // La combinación de operadora y número
	index: number
	onChange: (value: string, index: number) => void
}

const operadoras = [{ id: '0412' }, { id: '0414' }, { id: '0424' }, { id: '0416' }, { id: '0436' }]

export const ExtensionInput = memo(({ value, index, onChange }: ExtensionInputProps) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useState(false)
	const [operadora, setOperadora] = useState<string>(() => {
		const match = value.match(/(\d{4})(\d{7})/)
		return match ? match[1] : ''
	})
	const [numero, setNumero] = useState<string>(() => {
		const match = value.match(/(\d{4})(\d{7})/)
		return match ? match[2] : ''
	})

	const uptadeCombinedValue = useCallback(
		({ newOperadora, newNumero }: { newOperadora: string; newNumero: string }) => {
			const combinedValue = `${newOperadora}${newNumero}`
			const isValid = EmployeeExtension.isValid(combinedValue)
			setIsError(!isValid)
			setErrorMessage(isValid ? '' : EmployeeExtension.invalidMessage())
			onChange(combinedValue, index)
		},
		[index, onChange]
	)

	const handleOperadoraChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const newOperadora = event.target.value
			setOperadora(newOperadora)
			uptadeCombinedValue({ newOperadora, newNumero: numero })
		},
		[numero, uptadeCombinedValue]
	)

	const handleNumeroChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const maxLength = 7 // Define el límite de caracteres
			const newNumero = event.target.value.trim().slice(0, maxLength)
			setNumero(newNumero)
			uptadeCombinedValue({ newOperadora: operadora, newNumero })
		},
		[operadora, uptadeCombinedValue]
	)

	return (
		<Input
			value={numero}
			label={`Extension #${index + 1}`}
			name={`extension-#${index + 1}`}
			type="tel"
			pattern="[0-9]{7}"
			inputMode="numeric"
			onChange={handleNumeroChange}
			error={isError}
			errorMessage={errorMessage}
			selectInput={
				<select
					value={operadora}
					onChange={handleOperadoraChange}
					className="leftIcon focus:outline-none appearance-none"
				>
					<option value="">-</option>
					{operadoras.map(op => (
						<option key={op.id} value={op.id}>
							{op.id}
						</option>
					))}
				</select>
			}
		/>
	)
})
