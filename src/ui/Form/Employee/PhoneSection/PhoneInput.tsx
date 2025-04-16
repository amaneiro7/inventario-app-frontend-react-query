import { memo, useState, useCallback, useEffect } from 'react'
import { EmployeePhoneNumber } from '@/core/employee/employee/domain/value-object/EmployeePhoneNumber'
import { Input } from '@/components/Input/Input'

interface PhoneInputProps {
	operadora: string
	numero: string
	index: number
	handlePhoneChange: ({
		type,
		index,
		value
	}: {
		type: 'phoneNumero' | 'phoneOperadora' | 'extensionNumero' | 'extensionOperadora'
		index: number
		value: string
	}) => void
}

const operadoras = [{ id: '0412' }, { id: '0414' }, { id: '0424' }, { id: '0416' }, { id: '0436' }]

export const PhoneInput = memo(
	({ operadora, numero, index, handlePhoneChange }: PhoneInputProps) => {
		const [errorMessage, setErrorMessage] = useState('')
		const [isError, setIsError] = useState(false)

		useEffect(() => {
			const combinedValue = `${operadora}${numero}`

			if (combinedValue.length === 0) {
				setIsError(false)
				setErrorMessage('')
				return
			}
			const isValid = EmployeePhoneNumber.isValid(combinedValue)
			setIsError(!isValid)
			setErrorMessage(isValid ? '' : EmployeePhoneNumber.invalidMessage())
		}, [numero, operadora])

		const handleOperadoraChange = useCallback(
			(event: React.ChangeEvent<HTMLSelectElement>) => {
				const value = event.target.value
				handlePhoneChange({ type: 'phoneOperadora', index, value })
			},
			[index, handlePhoneChange]
		)

		const handleNumeroChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				const value = event.target.value
				handlePhoneChange({ type: 'phoneNumero', index, value })
			},
			[index, handlePhoneChange]
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
						required={numero.length > 0}
						className="leftIcon focus:outline-hidden appearance-none"
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
