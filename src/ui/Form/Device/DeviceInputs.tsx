import { lazy, memo, Suspense } from 'react'
import {
	DeviceRequired,
	DevicesDisabled,
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

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

interface Props {
	formData: DefaultDevice
	errors: DevicesErrors
	disabled: DevicesDisabled
	required: DeviceRequired
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
	formData,
	errors,
	required,
	disabled,
	handleChange,
	handleLocation,
	handleModel
}: Props) {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-5 gap-y-6">
			<Suspense>
				<StatusCombobox
					value={formData.statusId}
					handleChange={(_name, value) => handleChange('statusId', value)}
					name="statusId"
				/>
			</Suspense>
			<Suspense>
				<MainCategoryCombobox
					value={formData.mainCategoryId}
					handleChange={(_name, value) => handleChange('mainCategoryId', value)}
					name="mainCategoryId"
				/>
			</Suspense>
			<Suspense>
				<CategoryCombobox
					value={formData.categoryId}
					handleChange={(_name, value) => handleChange('categoryId', value)}
					mainCategoryId={formData.mainCategoryId}
					name="categoryId"
					required={required.categoryId}
					disabled={disabled.categoryId}
				/>
			</Suspense>
			<Suspense>
				<BrandCombobox
					value={formData.brandId}
					handleChange={(_name, value) => handleChange('brandId', value)}
					name="brandId"
				/>
			</Suspense>
			<Suspense>
				<ModelCombobox
					value={formData.modelId}
					handleFormChange={handleModel}
					brandId={formData.brandId}
					categoryId={formData.categoryId}
					name="modelId"
					method="form"
				/>
			</Suspense>
			<Input
				value={formData.serial ?? ''}
				name="serial"
				label="Serial"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('serial', e.target.value)
				}
				error={!!errors?.serial}
				errorMessage={errors?.serial}
				required={required.serial}
				disabled={disabled.serial}
			/>
			<Input
				value={formData.activo ?? ''}
				name="activo"
				label="Activo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('activo', e.target.value)
				}
				error={!!errors?.activo}
				errorMessage={errors?.activo}
				required={required.activo}
				disabled={disabled.activo}
			/>
			<Suspense>
				<EmployeeCombobox
					value={formData.employeeId ?? ''}
					handleChange={(_name, value) => handleChange('employeeId', value)}
					name="employeeId"
				/>
			</Suspense>
			<div className="flex gap-5 col-span-3">
				<Suspense>
					<LocationCombobox
						value={formData.locationId ?? ''}
						statusId={formData.statusId}
						handleFormChange={handleLocation}
						name="locationId"
						method="form"
					/>
				</Suspense>
				<Input
					value={formData.stockNumber ?? ''}
					name="stockNumber"
					label="N° de Stock"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('stockNumber', e.target.value)
					}
					error={!!errors?.stockNumber}
					errorMessage={errors?.stockNumber}
					required={required.stockNumber}
					disabled={disabled.stockNumber}
				/>
			</div>
			<Input
				value={formData.observation ?? ''}
				name="observation"
				label="Observación"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('observation', e.target.value)
				}
				error={!!errors?.observation}
				errorMessage={errors?.observation}
				required={required.observation}
				disabled={disabled.observation}
			/>
		</div>
	)
})
