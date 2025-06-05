import { memo } from 'react'
import { usePhone } from './usePhone'
import { Input } from '@/components/Input/Input'
import { PhoneNumberAreaCode } from '@/core/employee/employee/domain/value-object/EmployeePhoneNumber'

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

const operadoras = Object.values(PhoneNumberAreaCode).map(phone => ({ id: phone }))

export const PhoneInput = memo(
	({ operadora, numero, index, handlePhoneChange }: PhoneInputProps) => {
		const { errorMessage, handleOperadoraChange, handleNumeroChange, isError } = usePhone({
			handlePhoneChange,
			index,
			numero,
			operadora
		})

		return (
			<Input
				id={`Teléfono-${index + 1}`}
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
						className="leftIcon appearance-none focus:outline-hidden"
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
