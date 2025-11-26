import { ExtensionInput } from './ExtensionInput'
import Typography from '@/shared/ui/Typography'
import Button from '@/shared/ui/Button'
import { CloseIcon } from '@/shared/ui/icon/CloseIcon'
import { BrushIcon } from '@/shared/ui/icon/BrushIcon'
import { type DefaultEmployee } from '@/entities/employee/employee/infra/reducers/employeeFormReducer'

interface ExtensionSectionProps {
	extension: DefaultEmployee['extension']
	extensionSegments: DefaultEmployee['extensionSegments']
	handleAddPhones: ({ type }: { type: 'addPhone' | 'addExtension' }) => void
	handleClearFirstPhone: ({
		type,
		index
	}: {
		type: 'clearPhone' | 'clearExtension'
		index: number
	}) => void
	isLoading: boolean
	readOnly: boolean
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

/**
 * `ExtensionSection` is a functional component that renders a section for managing employee extension numbers.
 * It allows adding, removing, and clearing extension number entries, and handles changes to individual extension segments.
 */
export const ExtensionSection = ({
	handleAddPhones,
	handleClearFirstPhone,
	handlePhoneChange,
	handleRemovePhones,
	extension,
	extensionSegments,
	isLoading,
	readOnly
}: ExtensionSectionProps) => {
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
					disabled={extension[extension?.length - 1] === '' || readOnly}
					title={addPhoneButtonText}
					onClick={() => handleAddPhones({ type: 'addExtension' })}
				/>
			</div>
			{extensionSegments.map(({ numero, operadora }, index) => (
				<div key={index} className="flex items-center gap-2">
					<ExtensionInput
						index={index}
						numero={numero}
						isLoading={isLoading}
						operadora={operadora}
						readonly={readOnly}
						handlePhoneChange={handlePhoneChange}
					/>

					{index === 0 && extension.length <= 1 ? (
						<Button
							className="mb-3 aspect-square rounded-full pr-0.5 font-black"
							buttonSize="medium"
							text=""
							icon={<BrushIcon className="h-4 w-4 fill-white text-white" />}
							size="content"
							color="blue"
							disabled={readOnly || extension[index] === ''}
							title={clearPhoneButtonTitle}
							onClick={() => handleClearFirstPhone({ type: 'clearExtension', index })}
						/>
					) : (
						(index > 0 || extension.length > 1) && (
							<Button
								className="mb-3 aspect-square rounded-full pr-0.5 font-black"
								buttonSize="medium"
								text=""
								type="button"
								icon={<CloseIcon className="h-4 w-4" />}
								size="content"
								color="blue"
								disabled={readOnly}
								title={removePhoneButtonTitle}
								onClick={() =>
									handleRemovePhones({ type: 'removeExtension', index })
								}
							/>
						)
					)}
				</div>
			))}
		</>
	)
}
