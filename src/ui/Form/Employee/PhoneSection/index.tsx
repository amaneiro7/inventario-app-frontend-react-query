import { PhoneInput } from './PhoneInput'
import Typography from '@/components/Typography'
import Button from '@/components/Button'
import { CloseIcon } from '@/icon/CloseIcon'
import { BrushIcon } from '@/icon/BrushIcon'
import { type DefaultEmployee } from '@/core/employee/employee/infra/reducers/employeeFormReducer'

interface PhoneSectionProps {
	phones: DefaultEmployee['phone']
	phoneSegments: DefaultEmployee['phoneSegments']
	handleAddPhones: ({ type }: { type: 'addPhone' | 'addExtension' }) => void
	handleClearFirstPhone: ({
		type,
		index
	}: {
		type: 'clearPhone' | 'clearExtension'
		index: number
	}) => void
	handlePhoneChange: ({
		type,
		index,
		value
	}: {
		type: 'phoneNumero' | 'phoneOperadora' | 'extensionNumero' | 'extensionOperadora'
		index: number
		value: string
	}) => void
	handleRemovePhones: ({
		type,
		index
	}: {
		type: 'removePhone' | 'removeExtension'
		index: number
	}) => void
}

export const PhoneSection = ({
	handleAddPhones,
	handleClearFirstPhone,
	handlePhoneChange,
	handleRemovePhones,
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
						index={index}
						numero={numero}
						operadora={operadora}
						handlePhoneChange={handlePhoneChange}
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
							title={clearPhoneButtonTitle}
							onClick={() => handleClearFirstPhone({ type: 'clearPhone', index })}
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
								onClick={() => handleRemovePhones({ type: 'removePhone', index })}
							/>
						)
					)}
				</div>
			))}
		</>
	)
}
