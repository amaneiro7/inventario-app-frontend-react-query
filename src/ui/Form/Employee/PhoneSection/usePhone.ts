import { useCallback, useEffect, useState } from 'react'
import { EmployeePhoneNumber } from '@/core/employee/employee/domain/value-object/EmployeePhoneNumber'

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

	return {
		errorMessage,
		isError,
		handleOperadoraChange,
		handleNumeroChange,
		operadoras
	}
}
