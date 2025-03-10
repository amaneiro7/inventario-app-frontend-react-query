/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import { MemoryRamTypeCombobox } from '@/components/ComboBox/Sincrono/MemoryRamTypeComboBox'
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/core/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { Input } from '@/components/Input/Input'
import { MemoryRamSlotQuantity } from '@/core/model/models/domain/value-object/MemoryRamSlotQuantity'
import { Checkbox } from '@/components/Checkbox/Checbox'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'

interface Props {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const AddModelComputerFeatures = memo(function ({
	handleChange,
	disabled,
	errors,
	formData,
	required
}: Props) {
	return (
		<>
			<div className="flex gap-4">
				<MemoryRamTypeCombobox
					value={formData.memoryRamTypeId}
					handleChange={(_name, value) => handleChange('memoryRamTypeId', value)}
					name="memoryRamTypeId"
					error={errors.memoryRamTypeId}
					required={required.memoryRamTypeId}
					disabled={disabled.memoryRamTypeId}
				/>
				<Input
					value={formData.memoryRamSlotQuantity}
					name="memoryRamSlotQuantity"
					type="number"
					label="Cantidad de ranuras"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('memoryRamSlotQuantity', Number(e.target.value))
					}
					error={!!errors?.memoryRamSlotQuantity}
					errorMessage={errors?.memoryRamSlotQuantity}
					required={required.memoryRamSlotQuantity}
					min={MemoryRamSlotQuantity.MIN}
					max={MemoryRamSlotQuantity.MAX}
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
				<Checkbox
					label="Tiene Bluetooth"
					text="¿Tiene Bluetooth?"
					value={formData.hasBluetooth}
					name="hasBluetooth"
					onChange={e => {
						handleChange('hasBluetooth', e.target.checked)
					}}
				/>
				<Checkbox
					label="Tiene Wifi"
					text="¿Tiene Adaptador Wifi?"
					value={formData.hasWifiAdapter}
					name="hasWifiAdapter"
					onChange={e => {
						handleChange('hasWifiAdapter', e.target.checked)
					}}
				/>
			</div>
			{formData.categoryId === CategoryOptions.LAPTOP ? (
				<Input
					value={formData.batteryModel}
					name="batteryModel"
					label="Número de modelo de bateria"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('batteryModel', e.target.value)
					}
					error={!!errors?.batteryModel}
					errorMessage={errors?.batteryModel}
					required={required.batteryModel}
					disabled={disabled.batteryModel}
				/>
			) : null}
		</>
	)
})
