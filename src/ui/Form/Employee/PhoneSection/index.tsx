/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react'
import {
	type Action,
	type DefaultEmployee
} from '@/core/employee/employee/infra/reducers/employeeFormReducer'
import { PhoneInput } from './PhoneInput'
import Typography from '@/components/Typography'
import Button from '@/components/Button'
import { CloseIcon } from '@/icon/CloseIcon'
import { BrushIcon } from '@/icon/BrushIcon'

interface PhoneSectionProps {
	value: DefaultEmployee['phone']
	handleChange: (name: Action['type'], value: any) => void
}

export const PhoneSection = ({ handleChange, value }: PhoneSectionProps) => {
	const [phones, setPhones] = useState<string[]>(() =>
		Array.isArray(value) && value.length > 0 ? value : ['']
	)

	console.log(phones, value)

	const updatePhones = useCallback(
		(newPhones: string[]) => {
			setPhones(newPhones)
			handleChange('phone', newPhones)
		},
		[handleChange]
	)

	const handlePhoneChange = useCallback(
		(index: number, value: string) => {
			const newPhones = [...phones]
			newPhones[index] = value
			updatePhones(newPhones)
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
				updatePhones(newPhones)
			}
		},
		[phones, updatePhones]
	)

	const handleClearFirstPhone = useCallback(() => {
		const newPhones = [...phones]
		newPhones[0] = ''
		updatePhones(newPhones)
	}, [phones, updatePhones])

	const addPhoneButtonText = 'Agregar otro teléfono'
	const removePhoneButtonTitle = 'Eliminar el teléfono'
	const clearPhoneButtonTitle = 'Limpiar teléfono'
	return (
		<>
			<div className="flex justify-between">
				<Typography color="azul" variant="h6">
					Números de teléfono
				</Typography>
				<Button
					buttonSize="small"
					text={addPhoneButtonText}
					size="content"
					color="orange"
					disabled={phones[phones.length - 1] === ''}
					title="Agregar otro teléfono"
					onClick={handleAddPhone}
				/>
			</div>
			{phones.map((phone, index) => (
				<div key={index} className="flex items-center gap-2">
					<PhoneInput
						key={'phone-' + index}
						index={index}
						value={phone}
						onChange={(value, index) => handlePhoneChange(index, value)}
					/>

					{index === 0 ? (
						<Button
							className="rounded-full mb-3 aspect-square flex items-center font-black justify-center"
							buttonSize="medium"
							text=""
							icon={<BrushIcon className="h-4 w-4 fill-white text-white" />}
							size="content"
							color="blue"
							disabled={!phone}
							title={clearPhoneButtonTitle}
							onClick={handleClearFirstPhone}
						/>
					) : (
						index < 1 && (
							<Button
								className="rounded-full mb-3 aspect-square flex items-center font-black justify-center"
								buttonSize="medium"
								text=""
								icon={<CloseIcon className="h-4 w-4" />}
								size="content"
								color="blue"
								title={removePhoneButtonTitle}
								onClick={() => handleRemovePhone(index)}
							/>
						)
					)}
				</div>
			))}
		</>
	)
}
