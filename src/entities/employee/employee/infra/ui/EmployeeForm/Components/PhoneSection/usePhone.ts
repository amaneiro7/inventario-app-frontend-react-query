import { useCallback, useEffect, useState } from 'react'
import { EmployeePhoneNumber } from '@/entities/employee/employee/domain/value-object/EmployeePhoneNumber'

interface PhoneInputProps {
	/**
	 * The operator (area code) of the phone number.
	 */
	operadora: string
	/**
	 * The numeric part of the phone number.
	 */
	numero: string
	/**
	 * The index of this phone input in a list of phone numbers.
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

const operadoras = [{ id: '0412' }, { id: '0414' }, { id: '0424' }, { id: '0416' }, { id: '0436' }]

/**
 * A custom React hook for managing the state and validation of a single phone number input.
 * It provides handlers for changes to the operator and numeric parts of the phone number,
 * and exposes error messages and validation status.
 *
 * @param props - The properties for the phone input, including current values and change handler.
 * @returns An object containing error message, error status, and change handlers for the phone input.
 */
export const usePhone = ({ handlePhoneChange, index, numero, operadora }: PhoneInputProps) => {
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		const combinedValue = `${operadora}${numero}`

		if (combinedValue.length === 0) {
			setIsError(false)
			setErrorMessage('')
			return
		}
		const isValid = EmployeePhoneNumber.isValid({ value: combinedValue })
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

	return {
		errorMessage,
		isError,
		handleOperadoraChange,
		handleNumeroChange,
		operadoras
	}
}
