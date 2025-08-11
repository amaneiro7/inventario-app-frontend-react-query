import { PhoneInput } from './PhoneInput'
import Typography from '@/shared/ui/Typography'
import Button from '@/shared/ui/Button'
import { CloseIcon } from '@/shared/ui/icon/CloseIcon'
import { BrushIcon } from '@/shared/ui/icon/BrushIcon'
import { type DefaultEmployee } from '@/entities/employee/employee/infra/reducers/employeeFormReducer'

interface PhoneSectionProps {
	isLoading: boolean
	/**
	 * An array of phone numbers for the employee.
	 */
	phones: DefaultEmployee['phone']
	/**
	 * An array of segmented phone numbers, each with an operator and number part.
	 */
	phoneSegments: DefaultEmployee['phoneSegments']
	/**
	 * Callback function to add a new phone or extension field.
	 * @param params - An object specifying the type of field to add ('addPhone' or 'addExtension').
	 */
	handleAddPhones: ({ type }: { type: 'addPhone' | 'addExtension' }) => void
	/**
	 * Callback function to clear the first phone or extension field.
	 * @param params - An object specifying the type and index of the field to clear.
	 */
	handleClearFirstPhone: ({
		type,
		index
	}: {
		type: 'clearPhone' | 'clearExtension'
		index: number
	}) => void
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
	/**
	 * Callback function to remove phone or extension fields.
	 * @param params - An object specifying the type and index of the field to remove.
	 */
	handleRemovePhones: ({
		type,
		index
	}: {
		type: 'removePhone' | 'removeExtension'
		index: number
	}) => void
}

/**
 * `PhoneSection` is a functional component that renders a section for managing employee phone numbers.
 * It allows adding, removing, and clearing phone number entries, and handles changes to individual phone segments.
 */
export const PhoneSection = ({
	handleAddPhones,
	handleClearFirstPhone,
	handlePhoneChange,
	handleRemovePhones,
	isLoading,
	phones,
	phoneSegments
}: PhoneSectionProps) => {
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
					disabled={!phones[phones?.length - 1]}
					title={addPhoneButtonText}
					onClick={() => handleAddPhones({ type: 'addPhone' })}
				/>
			</div>
			{phoneSegments.map(({ numero, operadora }, index) => (
				<div key={index} className="flex items-center gap-2">
					<PhoneInput
						isLoading={isLoading}
						index={index}
						numero={numero}
						operadora={operadora}
						handlePhoneChange={handlePhoneChange}
					/>

					{index === 0 && phones.length <= 1 ? (
						<Button
							className="mb-3 flex aspect-square items-center justify-center rounded-full font-black"
							buttonSize="medium"
							text=""
							icon={<BrushIcon className="h-4 w-4 fill-white text-white" />}
							size="content"
							color="blue"
							type="button"
							title={clearPhoneButtonTitle}
							onClick={() => handleClearFirstPhone({ type: 'clearPhone', index })}
						/>
					) : (
						(index > 0 || phones.length > 1) && (
							<Button
								className="mb-3 flex aspect-square items-center justify-center rounded-full font-black"
								buttonSize="medium"
								text=""
								type="button"
								icon={<CloseIcon className="h-4 w-4" />}
								size="content"
								color="blue"
								title={removePhoneButtonTitle}
								onClick={() => handleRemovePhones({ type: 'removePhone', index })}
							/>
						)
					)}
				</div>
			))}
		</>
	)
}
