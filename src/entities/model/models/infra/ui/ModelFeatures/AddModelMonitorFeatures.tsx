import { memo } from 'react'
import { ScreenSize } from '@/entities/model/models/domain/value-object/ScreenSize'
import { Input } from '@/shared/ui/Input/Input'
import { Checkbox } from '@/shared/ui/Checkbox'
// Types
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/entities/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

interface AddModelMonitorFeaturesProps {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelRequired
	disabled: ModelDisabled
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
	isLoading: boolean
	canEdit: boolean
}

/**
 * `AddModelMonitorFeatures` is a memoized functional component that renders input fields
 * specific to monitor models. It includes fields for screen size and various ports (VGA, DVI, HDMI).
 */
export const AddModelMonitorFeatures = memo(
	({
		handleChange,
		errors,
		formData,
		canEdit,
		isLoading,
		required
	}: AddModelMonitorFeaturesProps) => {
		return (
			<>
				<div className="grid gap-4 md:grid-cols-2">
					<Input
						id="screenSize"
						value={formData.screenSize}
						name="screenSize"
						isLoading={isLoading}
						type="number"
						label="Tamaño de la pantaña"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('screenSize', Number(e.target.value))
						}
						error={!!errors?.screenSize}
						errorMessage={errors?.screenSize}
						required={required.screenSize}
						readOnly={!canEdit}
						rightAdorment={<span className="text-[8px]">Pulgadas</span>}
						min={ScreenSize.MIN}
						max={ScreenSize.MAX}
						step={0.1}
					/>
					<div className="grid grid-flow-row gap-4 md:grid-cols-2">
						<Checkbox
							text="¿Tiene puerto VGA?"
							value={formData.hasVGA}
							name="hasVGA"
							readOnly={!canEdit}
							onChange={e => {
								handleChange('hasVGA', e.target.checked)
							}}
						/>
						<Checkbox
							text="¿Tiene puerto DVI?"
							value={formData.hasDVI}
							name="hasDVI"
							readOnly={!canEdit}
							onChange={e => {
								handleChange('hasDVI', e.target.checked)
							}}
						/>
						<Checkbox
							text="¿Tiene puerto HDMI?"
							value={formData.hasHDMI}
							name="hasHDMI"
							readOnly={!canEdit}
							onChange={e => {
								handleChange('hasHDMI', e.target.checked)
							}}
						/>
					</div>
				</div>
			</>
		)
	}
)

AddModelMonitorFeatures.displayName = 'AddModelMonitorFeatures'
