import { memo } from 'react'
import { usePhone } from './usePhone'
import { Input } from '@/shared/ui/Input/Input'
import { PhoneNumberAreaCode } from '@/entities/employee/employee/domain/value-object/EmployeePhoneNumber'

interface PhoneInputProps {
	operadora: string
	numero: string
	index: number
	readonly?: boolean
	handlePhoneChange: ({
		type,
		index,
		value
	}: {
		type: 'phoneNumero' | 'phoneOperadora' | 'extensionNumero' | 'extensionOperadora'
		index: number
		value: string
	}) => void
	isLoading: boolean
}

const operadoras = Object.values(PhoneNumberAreaCode).map(phone => ({ id: phone }))

/**
 * `PhoneInput` is a memoized functional component that provides input fields for a single phone number,
 * including a dropdown for the area code (operadora) and a text input for the numeric part.
 * It integrates with the `usePhone` hook for validation and change handling.
 */
export const PhoneInput = memo(
	({ operadora, numero, index, readonly, isLoading, handlePhoneChange }: PhoneInputProps) => {
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
				isLoading={isLoading}
				readOnly={readonly}
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
