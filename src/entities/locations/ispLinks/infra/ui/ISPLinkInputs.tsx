import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import type {
	Action,
	DefaultISPLink,
	ISPLinkErrors,
	ISPLinkRequired
} from '../reducers/ispLinkFormReducer'

interface ISPLinkInputsProps {
	formData: DefaultISPLink
	errors: ISPLinkErrors
	isLoading: boolean
	canEdit: boolean
	required: ISPLinkRequired
	handleChange: (name: Action['type'], value: string | number) => void
}

export const ISPLinkInputs = memo(
	({
		errors,
		required,
		formData,
		canEdit,
		handleChange,
		isLoading = false
	}: ISPLinkInputsProps) => {
		return (
			<>
				<Input
					id="isp-link-name"
					value={formData.name}
					name="name"
					isLoading={isLoading}
					label="Nombre del proveedor de servicios ISP"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required={required.name}
					readOnly={!canEdit}
				/>
			</>
		)
	}
)

ISPLinkInputs.displayName = 'ISPLinkInputs'
