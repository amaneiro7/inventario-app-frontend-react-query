/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { Checkbox } from '@/shared/ui/Checkbox'
import { ScreenSize } from '@/entities/model/models/domain/value-object/ScreenSize'
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
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const AddModelMonitorFeatures = memo(
	({ handleChange, errors, formData, required }: AddModelMonitorFeaturesProps) => {
		return (
			<>
				<div className="flex gap-4">
					<Input
						id="screenSize"
						value={formData.screenSize}
						name="screenSize"
						type="number"
						label="Tamaño de la pantaña"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('screenSize', Number(e.target.value))
						}
						error={!!errors?.screenSize}
						errorMessage={errors?.screenSize}
						required={required.screenSize}
						rightAdorment={<p>Pulgadas</p>}
						min={ScreenSize.MIN}
						max={ScreenSize.MAX}
						step={0.1}
					/>
				</div>
				<div className="grid grid-flow-row gap-4 md:grid-cols-3">
					<Checkbox
						label="Tiene puerto VGA"
						text="¿Tiene puerto VGA?"
						value={formData.hasVGA}
						name="hasVGA"
						onChange={e => {
							handleChange('hasVGA', e.target.checked)
						}}
					/>
					<Checkbox
						label="Tiene puerto DVI"
						text="¿Tiene puerto DVI?"
						value={formData.hasDVI}
						name="hasDVI"
						onChange={e => {
							handleChange('hasDVI', e.target.checked)
						}}
					/>
					<Checkbox
						label="Tiene puerto HDMI"
						text="¿Tiene puerto HDMI?"
						value={formData.hasHDMI}
						name="hasHDMI"
						onChange={e => {
							handleChange('hasHDMI', e.target.checked)
						}}
					/>
				</div>
			</>
		)
	}
)

AddModelMonitorFeatures.displayName = 'AddModelMonitorFeatures'
