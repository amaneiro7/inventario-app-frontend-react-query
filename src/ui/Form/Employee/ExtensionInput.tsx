import { memo, useState, useCallback } from 'react'
import { Input } from '@/components/Input/Input'
import { EmployeeExtension } from '@/core/employee/employee/domain/value-object/EmployeeExtension'

interface ExtensionInputProps {
	value: string // La combinación de operadora y número
	index: number
	onChange: (value: string, index: number) => void
}

const operadoras = [
	{
		id: '0412'
	},
	{
		id: '0414'
	},
	{
		id: '0424'
	},
	{
		id: '0416'
	},
	{
		id: '0436'
	}
]

export const ExtensionInput = memo(({ value, index, onChange }: ExtensionInputProps) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useState(false)
	const [operadora, setOperadora] = useState<string>(() => {
		// Inicializar con la operadora del valor si existe
		if (!value) {
			return ''
		}
		const match = value.match(/(\+\d+)\s(\d+)/)
		return match ? match[1] : operadoras[0]?.id || ''
	})
	const [numero, setNumero] = useState<string>(() => {
		// Inicializar con el número del valor si existe
		if (!value) {
			return ''
		}
		const match = value.match(/(\+\d+)\s(\d+)/)
		return match ? match[2] : ''
	})

	const handleOperadoraChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		setOperadora(event.target.value)
	}, [])

	const handleNumeroChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value.trim()
			const maxLength = 7 // Define el límite de caracteres
			const truncatedValue = value.slice(0, maxLength) // Trunca el valor si excede el límite
			setNumero(truncatedValue)
			const combinedValue = `${operadora}${truncatedValue}`
			const isValid = EmployeeExtension.isValid(combinedValue)
			setIsError(!isValid)
			setErrorMessage(isValid ? '' : EmployeeExtension.invalidMessage())
			onChange(combinedValue, index)
		},
		[operadora, index, onChange]
	)

	return (
		<Input
			value={numero}
			label={`Extension #${index + 1}`}
			name={`extension-#${index + 1}`}
			type="tel"
			pattern="/d*"
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
					<option hidden value="default"></option>
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
