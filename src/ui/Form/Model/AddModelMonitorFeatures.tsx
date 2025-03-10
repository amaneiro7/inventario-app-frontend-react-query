/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/core/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { Input } from '@/components/Input/Input'
import { Checkbox } from '@/components/Checkbox/Checbox'
import { ScreenSize } from '@/core/model/models/domain/value-object/ScreenSize'

interface Props {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const AddModelMonitorFeatures = memo(function ({
	handleChange,
	errors,
	formData,
	required
}: Props) {
	return (
		<>
			<div className="flex gap-4">
				<Input
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
			<div className="grid md:grid-cols-3 grid-flow-row gap-4">
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
})
