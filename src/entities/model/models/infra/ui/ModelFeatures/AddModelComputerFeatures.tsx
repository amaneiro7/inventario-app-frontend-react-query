/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, memo, Suspense } from 'react'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import { Input } from '@/shared/ui/Input/Input'
import { Checkbox } from '@/shared/ui/Checkbox/Checbox'
import { MemoryRamSlotQuantity } from '@/entities/model/models/domain/value-object/MemoryRamSlotQuantity'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { ProcessorTransferList } from '@/entities/devices/features/processor/infra/ui/ProcessorTransferList'
// Types
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/entities/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const MemoryRamTypeCombobox = lazy(() =>
	import('@/entities/model/memoryRamType/infra/ui/MemoryRamTypeComboBox').then(m => ({
		default: m.MemoryRamTypeCombobox
	}))
)

interface AddModelComputerFeaturesProps {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const AddModelComputerFeatures = memo(
	({ handleChange, disabled, errors, formData, required }: AddModelComputerFeaturesProps) => {
		return (
			<>
				<div className="flex gap-4">
					<Suspense fallback={<InputFallback />}>
						<MemoryRamTypeCombobox
							value={formData.memoryRamTypeId}
							handleChange={(_name, value) => handleChange('memoryRamTypeId', value)}
							name="memoryRamTypeId"
							error={errors.memoryRamTypeId}
							required={required.memoryRamTypeId}
							disabled={disabled.memoryRamTypeId}
						/>
					</Suspense>
					<Input
						id="memoryRamSlotQuantity"
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
						id="batteryModel"
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
				<ProcessorTransferList
					value={formData.processors}
					name="processors"
					onAddProcessor={handleChange}
					onRemoveProcessor={handleChange}
				/>
			</>
		)
	}
)

AddModelComputerFeatures.displayName = 'AddModelComputerFeatures'
