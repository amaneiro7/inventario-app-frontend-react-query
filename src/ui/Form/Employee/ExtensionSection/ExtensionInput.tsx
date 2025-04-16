import { memo } from 'react'
import { useExtension } from './useExtension'
import { Input } from '@/components/Input/Input'

interface ExtensionInputProps {
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

export const ExtensionInput = memo(
	({ operadora, numero, index, handlePhoneChange }: ExtensionInputProps) => {
		const { codAreaGroupBy, errorMessage, handleNumeroChange, handleOperadoraChange, isError } =
			useExtension({ operadora, numero, index, handlePhoneChange })

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
						required={numero.length > 0}
						className="leftIcon focus:outline-hidden appearance-none"
					>
						<option value="">-</option>
						{codAreaGroupBy.map(([estado, ciudades]) => (
							<optgroup key={estado} label={estado}>
								{ciudades.map(({ ciudad, codigo, estado }) => (
									<option key={`${estado}-${ciudad}-${codigo}`} value={codigo}>
										{codigo}
									</option>
								))}
							</optgroup>
						))}
					</select>
				}
			/>
		)
	}
)
