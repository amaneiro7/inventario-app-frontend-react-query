/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Action } from '@/core/employee/employee/infra/reducers/employeeFormReducer'
import { PhoneInput } from './PhoneInput'
import Typography from '@/components/Typography'
import Button from '@/components/Button'
import { CloseIcon } from '@/icon/CloseIcon'
import { BrushIcon } from '@/icon/BrushIcon'
import { usePhoneSection } from './usePhoneSection'

interface PhoneSectionProps {
	value: string[]
	handleChange: (name: Action['type'], value: any) => void
	handlePhoneInputs: (name: Action['type'], index: number, value: string) => void
}

export const PhoneSection = ({ handleChange, handlePhoneInputs, value }: PhoneSectionProps) => {
	const {
		handleAddPhone,
		handleClearFirstPhone,
		handlePhoneChange,
		handleNumeroChange,
		handleOperadoraChange,
		handleRemovePhone,
		phones
	} = usePhoneSection({ handleChange, handlePhoneInputs, value })

	const addPhoneButtonText = 'Agregar otro teléfono'
	const removePhoneButtonTitle = 'Eliminar el teléfono'
	const clearPhoneButtonTitle = 'Limpiar teléfono'
	return (
		<>
			<div className="flex justify-between">
				<Typography color="azul" variant="h6">
					Número de teléfono
				</Typography>
				<Button
					buttonSize="small"
					text={addPhoneButtonText}
					size="content"
					type="button"
					color="orange"
					disabled={phones[phones.length - 1] === ''}
					title={addPhoneButtonText}
					onClick={handleAddPhone}
				/>
			</div>
			{phones.map(
				(phone, index) => (
					console.log('phone', phone),
					(
						<div key={index} className="flex items-center gap-2">
							<PhoneInput
								index={index}
								value={phone}
								onNumeroChange={handleNumeroChange}
								onOperadoraChange={handleOperadoraChange}
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
									type="button"
									disabled={!phone}
									title={clearPhoneButtonTitle}
									onClick={handleClearFirstPhone}
								/>
							) : (
								index > 0 && (
									<Button
										className="rounded-full mb-3 aspect-square flex items-center font-black justify-center"
										buttonSize="medium"
										text=""
										type="button"
										icon={<CloseIcon className="h-4 w-4" />}
										size="content"
										color="blue"
										title={removePhoneButtonTitle}
										onClick={() => handleRemovePhone(index)}
									/>
								)
							)}
						</div>
					)
				)
			)}
		</>
	)
}
