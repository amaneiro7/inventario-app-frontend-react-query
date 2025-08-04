import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { codigosAreaVenezuela } from '@/entities/employee/employee/domain/value-object/codigosAreaVenezuela'
import { EmployeeExtension } from '@/entities/employee/employee/domain/value-object/EmployeeExtension'
import { groupBy } from '@/shared/lib/utils/groupBy'

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

export function useExtension({ operadora, numero, index, handlePhoneChange }: ExtensionInputProps) {
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useState(false)

	const codAreaGroupBy = useMemo(() => {
		const grouped = groupBy(codigosAreaVenezuela, code => code.estado)

		const sortedStates = Object.entries(grouped).sort(([estadoA], [estadoB]) =>
			estadoA.localeCompare(estadoB)
		)

		return sortedStates
	}, [codigosAreaVenezuela])

	useEffect(() => {
		const combinedValue = `${operadora}${numero}`

		if (combinedValue.length === 0) {
			setIsError(false)
			setErrorMessage('')
			return
		}
		const isValid = EmployeeExtension.isValid(combinedValue)
		setIsError(!isValid)
		setErrorMessage(isValid ? '' : EmployeeExtension.invalidMessage())
	}, [numero, operadora])

	const handleOperadoraChange = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const value = event.target.value
			handlePhoneChange({ type: 'extensionOperadora', index, value })
		},
		[index, handlePhoneChange]
	)

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
