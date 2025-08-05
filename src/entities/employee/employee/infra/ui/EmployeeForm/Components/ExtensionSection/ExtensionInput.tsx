import { memo } from 'react'
import { useExtension } from './useExtension'
import { Input } from '@/shared/ui/Input/Input'

interface ExtensionInputProps {
	/**
	 * The operator (area code) of the extension.
	 */
	operadora: string
	/**
	 * The numeric part of the extension.
	 */
	numero: string
	/**
	 * The index of this extension input in a list of extensions.
	 */
	index: number
	/**
	 * Callback function to handle changes in phone number or extension segments.
	 * @param params - An object specifying the type, index, and new value of the segment.
	 */
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

/**
 * `ExtensionInput` is a memoized functional component that provides input fields for a single extension number,
 * including a dropdown for the area code (operadora) and a text input for the numeric part.
 * It integrates with the `useExtension` hook for validation and change handling.
 */
export const ExtensionInput = memo(
	({ operadora, numero, index, handlePhoneChange }: ExtensionInputProps) => {
		const { codAreaGroupBy, errorMessage, handleNumeroChange, handleOperadoraChange, isError } =
			useExtension({ operadora, numero, index, handlePhoneChange })

		return (
			<Input
				id={`Extension-${index + 1}`}
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
						className="leftIcon appearance-none focus:outline-hidden"
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