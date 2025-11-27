/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, memo } from 'react'
import { MemoryRamSlotQuantity } from '@/entities/model/models/domain/value-object/MemoryRamSlotQuantity'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
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

const MemoryRamTypeCombobox = lazy(() =>
	import('@/entities/model/memoryRamType/infra/ui/MemoryRamTypeComboBox').then(m => ({
		default: m.MemoryRamTypeCombobox
	}))
)
const ProcessorTransferList = lazy(() =>
	import('@/entities/devices/features/processor/infra/ui/ProcessorTransferList').then(m => ({
		default: m.ProcessorTransferList
	}))
)

interface AddModelComputerFeaturesProps {
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
 * `AddModelComputerFeatures` is a memoized functional component that renders input fields
 * specific to computer models (including laptops, all-in-ones, and servers).
 * It includes fields for RAM type, RAM slot quantity, various ports (VGA, DVI, HDMI),
 * Bluetooth, Wi-Fi, battery model (for laptops), and processors.
 */
export const AddModelComputerFeatures = memo(
	({
		handleChange,
		disabled,
		errors,
		formData,
		isLoading,
		canEdit,
		required
	}: AddModelComputerFeaturesProps) => {
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
						isLoading={isLoading}
						readonly={!canEdit}
					/>

					<Input
						id="memoryRamSlotQuantity"
						value={formData.memoryRamSlotQuantity}
						name="memoryRamSlotQuantity"
						isLoading={isLoading}
						type="number"
						label="Cantidad de ranuras"
						readOnly={!canEdit}
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
					<Checkbox
						text="¿Tiene Bluetooth?"
						value={formData.hasBluetooth}
						name="hasBluetooth"
						readOnly={!canEdit}
						onChange={e => {
							handleChange('hasBluetooth', e.target.checked)
						}}
					/>
					<Checkbox
						text="¿Tiene Adaptador Wifi?"
						value={formData.hasWifiAdapter}
						name="hasWifiAdapter"
						readOnly={!canEdit}
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
						isLoading={isLoading}
						label="Número de modelo de bateria"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('batteryModel', e.target.value)
						}
						error={!!errors?.batteryModel}
						readOnly={!canEdit}
						errorMessage={errors?.batteryModel}
						required={required.batteryModel}
						disabled={disabled.batteryModel}
					/>
				) : null}
				<ProcessorTransferList
					value={formData.processors}
					name="processors"
					readonly={!canEdit}
					isLoading={isLoading}
					onAddProcessor={handleChange}
					onRemoveProcessor={handleChange}
				/>
			</>
		)
	}
)

AddModelComputerFeatures.displayName = 'AddModelComputerFeatures'
