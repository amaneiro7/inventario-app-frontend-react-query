import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { codigosAreaVenezuela } from '@/entities/employee/employee/domain/value-object/codigosAreaVenezuela'
import { EmployeeExtension } from '@/entities/employee/employee/domain/value-object/EmployeeExtension'
import { groupBy } from '@/shared/lib/utils/groupBy'

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
 * A custom React hook for managing the state and validation of a single extension number input.
 * It provides handlers for changes to the operator and numeric parts of the extension,
 * and exposes error messages, validation status, and grouped area codes.
 *
 * @param props - The properties for the extension input, including current values and change handler.
 * @returns An object containing error message, error status, grouped area codes, and change handlers for the extension input.
 */
export function useExtension({ operadora, numero, index, handlePhoneChange }: ExtensionInputProps) {
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useState(false)

	/**
	 * Memoized grouping of Venezuelan area codes by state.
	 */
	const codAreaGroupBy = useMemo(() => {
		const grouped = groupBy(codigosAreaVenezuela, code => code.estado)

		const sortedStates = Object.entries(grouped).sort(([estadoA], [estadoB]) =>
			estadoA.localeCompare(estadoB)
		)

		return sortedStates
	}, [])

	useEffect(() => {
		const combinedValue = `${operadora}${numero}`

		if (combinedValue.length === 0) {
			setIsError(false)
			setErrorMessage('')
			return
		}
		const isValid = EmployeeExtension.isValid({ value: combinedValue })
		setIsError(!isValid)
		setErrorMessage(isValid ? '' : EmployeeExtension.invalidMessage())
	}, [numero, operadora])

	/**
	 * Handles changes to the operator (area code) of the extension.
	 * @param event - The change event from the select element.
	 */
	const handleOperadoraChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const value = event.target.value
			handlePhoneChange({ type: 'extensionOperadora', index, value })
		},
		[index, handlePhoneChange]
	)

	/**
	 * Handles changes to the numeric part of the extension.
	 * @param event - The change event from the input element.
	 */
	const handleNumeroChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value
			handlePhoneChange({ type: 'extensionNumero', index, value })
		},
		[index, handlePhoneChange]
	)
	return {
		errorMessage,
		isError,
		codAreaGroupBy,
		handleOperadoraChange,
		handleNumeroChange
	}
}