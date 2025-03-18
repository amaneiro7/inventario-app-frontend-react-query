import React, { useCallback } from 'react'
import {
	type Action,
	type DefaultEmployee
} from '@/core/employee/employee/infra/reducers/employeeFormReducer'

interface UsePhoneSectionProps {
	value: DefaultEmployee['phone']
	handleChange: (name: Action['type'], value: string[]) => void
	handlePhoneInputs: (name: Action['type'], index: number, value: string) => void
}
export const usePhoneSection = ({
	value,
	handleChange,
	handlePhoneInputs
}: UsePhoneSectionProps) => {
	const handlePhoneChange = useCallback(
		(index: number, newValue: string) => {
			const newPhones = value
			newPhones[index] = newValue
			handleChange('phone', newPhones)
		},
		[handleChange, value]
	)

	const handleAddPhone = useCallback(() => {
		if (value[value.length - 1] !== '') {
			const newPhone = value
			newPhone.push('')
			handleChange('phone', newPhone)
		}
	}, [handleChange, value])

	const handleRemovePhone = useCallback(
		(index: number) => {
			if (value.length > 1) {
				const newPhones = [...value]
				newPhones.splice(index, 1)
				handleChange('phone', newPhones)
			}
		},
		[handleChange]
	)

	const handleClearFirstPhone = useCallback(() => {
		const newPhones = value
		newPhones[0] = ''
		handleChange('phone', newPhones)
	}, [handleChange])

	const handleOperadoraChange = (event: React.ChangeEvent<HTMLSelectElement>, index: number) => {
		handlePhoneInputs('phoneOperadora', index, event.target.value)
	}
	const handleNumeroChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const maxLength = 7
		handlePhoneInputs('phoneNumber', index, event.target.value.trim().slice(0, maxLength))
	}

	return {
		phones: value, // Retorna el valor directamente de las props
		handlePhoneChange,
		handleAddPhone,
		handleRemovePhone,
		handleClearFirstPhone,
		handleOperadoraChange,
		handleNumeroChange
	}
}
