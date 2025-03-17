/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useEffect, useState } from 'react'
import {
	type Action,
	type DefaultEmployee
} from '@/core/employee/employee/infra/reducers/employeeFormReducer'
import { PhoneInput } from './PhoneInput'

interface PhoneSectionProps {
	value: DefaultEmployee['phone']
	handleChange: (name: Action['type'], value: any) => void
}

export const PhoneSection = memo(({ handleChange, value }: PhoneSectionProps) => {
	const [phones, setPhones] = useState<string[]>([''])

	useEffect(() => {
		if (Array.isArray(value) && value.length > 0) {
			setPhones(value)
		} else {
			setPhones([''])
		}
	}, [value])

	const handlePhoneChange = useCallback(
		(index: number, value: string) => {
			const newPhones = [...phones]
			newPhones[index] = value
			setPhones(newPhones)
			handleChange('phone', newPhones)
		},
		[phones, handleChange]
	)

	const handleAddPhone = useCallback(() => {
		if (phones[phones.length - 1] !== '') {
			setPhones([...phones, ''])
		}
	}, [phones])

	const handleRemovePhone = useCallback(
		(index: number) => {
			if (phones.length > 1) {
				const newPhones = [...phones]
				newPhones.splice(index, 1)
				setPhones(newPhones)
				handleChange('phone', newPhones)
			}
		},
		[phones, handleChange]
	)
	return (
		<>
			{phones.map((phone, index) => (
				<div key={index} className="flex items-center gap-4">
					<PhoneInput
						key={'phone-' + index}
						index={index}
						value={phone}
						onChange={(value, index) => handlePhoneChange(index, value)}
					/>
					<button
						className="rounded-full text-center w-8 mb-2 aspect-square flex items-center justify-center bg-naranja text-white disabled:bg-gris/50 disabled:cursor-not-allowed"
						type="button"
						disabled={phones[phones.length - 1] === ''}
						title="Agregar otro teléfono"
						onClick={handleAddPhone}
					>
						+
					</button>

					<button
						className="rounded-full text-center w-8 mb-2 aspect-square flex items-center justify-center bg-azul text-white disabled:bg-gris/50 disabled:cursor-not-allowed"
						type="button"
						disabled={index < 1}
						title="Eliminar el teléfono"
						onClick={() => handleRemovePhone(index)}
					>
						-
					</button>
				</div>
			))}
		</>
	)
})
