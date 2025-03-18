import { memo, useState, useCallback } from 'react'
import { EmployeePhoneNumber } from '@/core/employee/employee/domain/value-object/EmployeePhoneNumber'
import { Input } from '@/components/Input/Input'

interface PhoneInputProps {
	value: string // La combinación de operadora y número
	index: number
	onChange: (value: string, index: number) => void
	onNumeroChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
	onOperadoraChange: (event: React.ChangeEvent<HTMLSelectElement>, index: number) => void
}

const operadoras = [{ id: '0412' }, { id: '0414' }, { id: '0424' }, { id: '0416' }, { id: '0436' }]

export const PhoneInput = memo(
	({ value, index, onChange, onNumeroChange, onOperadoraChange }: PhoneInputProps) => {
		const [errorMessage, setErrorMessage] = useState('')
		const [isError, setIsError] = useState(false)
		const match = value.match(/(\d{4})(\d{7})/)
		const operadora = match ? match?.[1] : ''
		const numero = match ? match?.[2] : ''

		const validateError = useCallback(
			({ newOperadora, newNumero }: { newOperadora: string; newNumero: string }) => {
				const combinedValue = `${newOperadora}${newNumero}`
				const isValid = EmployeePhoneNumber.isValid(combinedValue)
				setIsError(!isValid)
				setErrorMessage(isValid ? '' : EmployeePhoneNumber.invalidMessage())
			},
			[index, onChange]
		)

		const handleOperadoraChange = useCallback(
			(event: React.ChangeEvent<HTMLSelectElement>) => {
				const newOperadora = event.target.value
				onOperadoraChange(event, index)
				validateError({ newOperadora, newNumero: numero })
			},
			[index, numero, onOperadoraChange, validateError]
		)

		const handleNumeroChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				const maxLength = 7 // Define el límite de caracteres
				const newNumero = event.target.value.trim().slice(0, maxLength)
				onNumeroChange(event, index)
				validateError({ newOperadora: operadora, newNumero })
			},
			[index, numero, onOperadoraChange, validateError]
		)

		return (
			<Input
				value={numero}
				label={`Teléfono #${index + 1}`}
				name={`phone-#${index + 1}`}
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
	}
)
