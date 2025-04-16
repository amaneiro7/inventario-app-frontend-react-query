import { memo } from 'react'
import { usePhone } from './usePhone'
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
		const { errorMessage, handleOperadoraChange, handleNumeroChange, isError } = usePhone({
			handlePhoneChange,
			index,
			numero,
			operadora
		})

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
