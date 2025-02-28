import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { StatusCombobox } from '@/components/ComboBox/Sincrono/StatusComboBox'
import { MainCategoryCombobox } from '@/components/ComboBox/Sincrono/MainCategoryComboBox'
import { CategoryCombobox } from '@/components/ComboBox/Sincrono/CategoryComboBox'
import { BrandCombobox } from '@/components/ComboBox/Asincrono/BrandComboBox'
import { ModelCombobox } from '@/components/ComboBox/Asincrono/ModelComboBox'
import { EmployeeCombobox } from '@/components/ComboBox/Asincrono/EmployeeComboBox'
import { LocationCombobox } from '@/components/ComboBox/Asincrono/LocationComboBox'
import { Input } from '@/components/Input/Input'
import { memo } from 'react'

interface Props {
	statusId: DefaultDevice['statusId']
	mainCategoryId: DefaultDevice['mainCategoryId']
	categoryId: DefaultDevice['categoryId']
	brandId: DefaultDevice['brandId']
	modelId: DefaultDevice['modelId']
	serial: DefaultDevice['serial']
	activo: DefaultDevice['activo']
	employeeId: DefaultDevice['employeeId']
	locationId: DefaultDevice['locationId']
	stockNumber: DefaultDevice['stockNumber']
	observation: DefaultDevice['observation']
	errorStatusId: DevicesErrors['statusId']
	errorMainCategoryId: DevicesErrors['mainCategoryId']
	errorCategoryId: DevicesErrors['categoryId']
	errorBrandId: DevicesErrors['brandId']
	errorModelId: DevicesErrors['modelId']
	errorSerial: DevicesErrors['serial']
	errorActivo: DevicesErrors['activo']
	errorEmployeeId: DevicesErrors['employeeId']
	errorLocationId: DevicesErrors['locationId']
	errorStockNumber: DevicesErrors['stockNumber']
	errorObservation: DevicesErrors['observation']
	disabledStatusId: DevicesDisabled['statusId']
	disabledMainCategoryId: DevicesDisabled['mainCategoryId']
	disabledCategoryId: DevicesDisabled['categoryId']
	disabledBrandId: DevicesDisabled['brandId']
	disabledModelId: DevicesDisabled['modelId']
	disabledSerial: DevicesDisabled['serial']
	disabledActivo: DevicesDisabled['activo']
	disabledEmployeeId: DevicesDisabled['employeeId']
	disabledLocationId: DevicesDisabled['locationId']
	disabledStockNumber: DevicesDisabled['stockNumber']
	disabledObservation: DevicesDisabled['observation']
	requiredStatusId: DeviceRequired['statusId']
	requiredMainCategoryId: DeviceRequired['mainCategoryId']
	requiredCategoryId: DeviceRequired['categoryId']
	requiredBrandId: DeviceRequired['brandId']
	requiredModelId: DeviceRequired['modelId']
	requiredSerial: DeviceRequired['serial']
	requiredActivo: DeviceRequired['activo']
	requiredEmployeeId: DeviceRequired['employeeId']
	requiredLocationId: DeviceRequired['locationId']
	requiredStockNumber: DeviceRequired['stockNumber']
	requiredObservation: DeviceRequired['observation']

	handleChange: (name: Action['type'], value: string | number | boolean) => void
	handleLocation: ({
		value,
		typeOfSiteId,
		ipAddress
	}: {
		value: string
		typeOfSiteId?: string
		ipAddress?: string | null
	}) => Promise<void>
	handleModel: ({
		value,
		memoryRamSlotQuantity,
		memoryRamType,
		generic
	}: {
		value: string
		memoryRamSlotQuantity?: number
		memoryRamType?: string
		generic?: boolean
	}) => Promise<void>
}

export const DeviceInputs = memo(function ({
	statusId,
	mainCategoryId,
	categoryId,
	brandId,
	modelId,
	serial,
	activo,
	employeeId,
	locationId,
	stockNumber,
	observation,
	errorStatusId,
	errorMainCategoryId,
	errorCategoryId,
	errorBrandId,
	errorModelId,
	errorSerial,
	errorActivo,
	errorEmployeeId,
	errorLocationId,
	errorStockNumber,
	errorObservation,
	disabledStatusId,
	disabledMainCategoryId,
	disabledCategoryId,
	disabledBrandId,
	disabledModelId,
	disabledSerial,
	disabledActivo,
	disabledEmployeeId,
	disabledLocationId,
	disabledStockNumber,
	disabledObservation,
	requiredStatusId,
	requiredMainCategoryId,
	requiredCategoryId,
	requiredBrandId,
	requiredModelId,
	requiredSerial,
	requiredActivo,
	requiredEmployeeId,
	requiredLocationId,
	requiredStockNumber,
	requiredObservation,
	handleChange,
	handleLocation,
	handleModel
}: Props) {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-5 gap-y-6">
			<StatusCombobox
				value={statusId}
				handleChange={(_name, value) => handleChange('statusId', value)}
				name="statusId"
				error={errorStatusId}
				required={requiredStatusId}
				disabled={disabledStatusId}
			/>
			<MainCategoryCombobox
				value={mainCategoryId}
				handleChange={(_name, value) => handleChange('mainCategoryId', value)}
				name="mainCategoryId"
				error={errorMainCategoryId}
				required={requiredMainCategoryId}
				disabled={disabledMainCategoryId}
			/>
			<CategoryCombobox
				value={categoryId}
				handleChange={(_name, value) => handleChange('categoryId', value)}
				mainCategoryId={mainCategoryId}
				name="categoryId"
				error={errorCategoryId}
				required={requiredCategoryId}
				disabled={disabledCategoryId}
			/>
			<BrandCombobox
				value={brandId}
				handleChange={(_name, value) => handleChange('brandId', value)}
				name="brandId"
				error={errorBrandId}
				required={requiredBrandId}
				disabled={disabledBrandId}
			/>
			<ModelCombobox
				value={modelId}
				handleFormChange={handleModel}
				brandId={brandId}
				categoryId={categoryId}
				name="modelId"
				method="form"
				error={errorModelId}
				required={requiredModelId}
				disabled={disabledModelId}
			/>
			<Input
				value={serial ?? ''}
				name="serial"
				label="Serial"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('serial', e.target.value)
				}
				error={!!errorSerial}
				errorMessage={errorSerial}
				required={requiredSerial}
				disabled={disabledSerial}
			/>
			<Input
				value={activo ?? ''}
				name="activo"
				label="Activo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('activo', e.target.value)
				}
				error={!!errorActivo}
				errorMessage={errorActivo}
				required={requiredActivo}
				disabled={disabledActivo}
			/>
			<EmployeeCombobox
				value={employeeId ?? ''}
				handleChange={(_name, value) => handleChange('employeeId', value)}
				name="employeeId"
				error={errorEmployeeId}
				required={requiredEmployeeId}
				disabled={disabledEmployeeId}
			/>
			<div className="flex gap-5 col-span-3">
				<LocationCombobox
					value={locationId ?? ''}
					statusId={statusId}
					handleFormChange={handleLocation}
					name="locationId"
					method="form"
					error={errorLocationId}
					required={requiredLocationId}
					disabled={disabledLocationId}
				/>
				<Input
					value={stockNumber ?? ''}
					name="stockNumber"
					label="N° de Stock"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('stockNumber', e.target.value)
					}
					error={!!errorStockNumber}
					errorMessage={errorStockNumber}
					required={requiredStockNumber}
					disabled={disabledStockNumber}
				/>
			</div>
			<Input
				value={observation ?? ''}
				name="observation"
				label="Observación"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('observation', e.target.value)
				}
				error={!!errorObservation}
				errorMessage={errorObservation}
				required={requiredObservation}
				disabled={disabledObservation}
			/>
		</div>
	)
})
