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

export const ExtensionSection = ({
	handleAddPhones,
	handleClearFirstPhone,
	handlePhoneChange,
	handleRemovePhones,
	extension,
	extensionSegments
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
					disabled={extension[extension?.length - 1] === ''}
					title={addPhoneButtonText}
					onClick={() => handleAddPhones({ type: 'addExtension' })}
				/>
			</div>
			{extensionSegments.map(({ numero, operadora }, index) => (
				<div key={index} className="flex items-center gap-2">
					<ExtensionInput
						index={index}
						numero={numero}
						operadora={operadora}
						handlePhoneChange={handlePhoneChange}
					/>

					{index === 0 && extension.length <= 1 ? (
						<Button
							className="mb-3 flex aspect-square items-center justify-center rounded-full font-black"
							buttonSize="medium"
							text=""
							icon={<BrushIcon className="h-4 w-4 fill-white text-white" />}
							size="content"
							color="blue"
							type="button"
							disabled={extension[index] === ''}
							title={clearPhoneButtonTitle}
							onClick={() => handleClearFirstPhone({ type: 'clearExtension', index })}
						/>
					) : (
						(index > 0 || extension.length > 1) && (
							<Button
								className="mb-3 flex aspect-square items-center justify-center rounded-full font-black"
								buttonSize="medium"
								text=""
								type="button"
								icon={<CloseIcon className="h-4 w-4" />}
								size="content"
								color="blue"
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
