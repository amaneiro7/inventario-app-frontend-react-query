/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense } from 'react'
import Typography from '@/components/Typography'
import { ClasifyMainDeviceInputs } from './ClasifyMainDeviceInputs'
import { InfoMainDeviceInputs } from './InfoMainDeviceInputs'
import {
	Action,
	type DefaultDevice,
	type DeviceRequired,
	type DevicesDisabled,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'

const AddtionalFeatures = lazy(async () =>
	import('./AddtionalFeatures').then(m => ({ default: m.AddtionalFeatures }))
)

interface DeviceInputsProps {
	formData: DefaultDevice
	errors: DevicesErrors
	required: DeviceRequired
	disabled: DevicesDisabled
	mode: FormMode
	handleChange: (name: Action['type'], value: any) => Promise<void>
	handleLocation: ({
		value,
		typeOfSiteId,
		ipAddress
	}: {
		value: string
		typeOfSiteId?: string
		ipAddress?: string | null
	}) => Promise<void>
	handleMemory: (value: string, index: number) => Promise<void>
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

export function DeviceInputs({
	formData,
	errors,
	disabled,
	required,
	mode,
	handleChange,
	handleLocation,
	handleMemory,
	handleModel
}: DeviceInputsProps) {
	return (
		<div className="flex flex-col gap-4">
			{/* Informacion Principal */}
			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<Typography color="azul" variant="h4">
						Información del dispositivo
					</Typography>
					<Suspense>
						<InfoMainDeviceInputs
							handleChange={handleChange}
							handleLocation={handleLocation}
							mode={mode}
							statusId={formData.statusId}
							locationId={formData.locationId}
							stockNumber={formData.stockNumber}
							typeOfSiteId={formData.typeOfSiteId}
							serial={formData.serial}
							activo={formData.activo}
							employeeId={formData.employeeId}
							observation={formData.observation}
							errorSerial={errors.serial}
							errorLocationId={errors.locationId}
							errorStockNumber={errors.stockNumber}
							errorActivo={errors.activo}
							errorEmployeeId={errors.employeeId}
							errorObservation={errors.observation}
							disabledSerial={disabled.serial}
							disabledActivo={disabled.activo}
							disabledEmployeeId={disabled.employeeId}
							disabledLocationId={disabled.locationId}
							disabledStockNumber={disabled.stockNumber}
							disabledObservation={disabled.observation}
							requiredSerial={required.serial}
							requiredActivo={required.activo}
							requiredEmployeeId={required.employeeId}
							requiredObservation={required.observation}
							requiredLocationId={required.locationId}
							requiredStockNumber={required.stockNumber}
						/>
					</Suspense>
				</div>
				{/* Clasificacion Principal */}
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<Typography color="azul" variant="h4">
						Clasificación del dispositivo
					</Typography>
					<Suspense>
						<ClasifyMainDeviceInputs
							handleChange={handleChange}
							handleModel={handleModel}
							mode={mode}
							statusId={formData.statusId}
							mainCategoryId={formData.mainCategoryId}
							categoryId={formData.categoryId}
							brandId={formData.brandId}
							modelId={formData.modelId}
							errorStatusId={errors.statusId}
							errorMainCategoryId={errors.mainCategoryId}
							errorCategoryId={errors.categoryId}
							errorBrandId={errors.brandId}
							errorModelId={errors.modelId}
							disabledStatusId={disabled.statusId}
							disabledMainCategoryId={disabled.mainCategoryId}
							disabledCategoryId={disabled.categoryId}
							disabledBrandId={disabled.brandId}
							disabledModelId={disabled.modelId}
							requiredStatusId={required.statusId}
							requiredMainCategoryId={required.mainCategoryId}
							requiredCategoryId={required.categoryId}
							requiredBrandId={required.brandId}
							requiredModelId={required.modelId}
						/>
					</Suspense>
				</div>
			</div>
			{/* Informacion Adicional */}
			<Suspense>
				<AddtionalFeatures
					formData={formData}
					errors={errors}
					required={required}
					disabled={disabled}
					handleChange={handleChange}
					handleMemory={handleMemory}
				/>
			</Suspense>
		</div>
	)
}
