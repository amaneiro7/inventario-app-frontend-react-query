/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Action } from '@/core/employee/employee/infra/reducers/employeeFormReducer'
import { ExtensionInput } from './ExtensionInput'
import Typography from '@/components/Typography'
import Button from '@/components/Button'
import { CloseIcon } from '@/icon/CloseIcon'
import { BrushIcon } from '@/icon/BrushIcon'
import { usePhoneSection } from './useExtensionSection'

interface ExtensionSectionProps {
	value: string[]
	handleChange: (name: Action['type'], value: any) => void
}

export const ExtensionSection = ({ handleChange, value }: ExtensionSectionProps) => {
	const { handleAddPhone, handleClearFirstPhone, handlePhoneChange, handleRemovePhone, phones } =
		usePhoneSection({ handleChange, value })

	const addPhoneButtonText = 'Agregar otra extensión'
	const removePhoneButtonTitle = 'Eliminar extensión'
	const clearPhoneButtonTitle = 'Limpiar extensión'
	return (
		<>
			<div className="flex justify-between">
				<Typography color="azul" variant="h6">
					Números de extensión
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
			{phones.map((phone, index) => (
				<div key={index} className="flex items-center gap-2">
					<ExtensionInput
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
							type="button"
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
			))}
		</>
	)
}
