import { Suspense } from 'react'
import { useCreateDevice } from '@/core/devices/devices/infra/hook/useCreateDevice'
import { Loading } from '@/components/Loading'
import { FormContainer } from '@/components/FormContainer/formContainer'
import { DeviceInputs } from '@/ui/Form/Device/DeviceInputs'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { AddMFPFeatures } from '@/ui/Form/Device/AddMFPFeatures'
import { AddHardDriveFeatures } from '@/ui/Form/Device/AddHardDriveFeatures'

export default function FormDevice() {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
		handleChange,
		handleLocation,
		handleMemory,
		handleModel,
		handleSubmit,
		resetForm
	} = useCreateDevice()

	return (
		<Suspense fallback={<Loading />}>
			<FormContainer
				id={key}
				title="Dispositivo"
				description="Ingrese los datos del dispositivo el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				handleClose={() => {
					return
				}}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/Processor/add"
			>
				<DeviceInputs
					handleChange={handleChange}
					handleLocation={handleLocation}
					handleModel={handleModel}
					statusId={formData.statusId}
					mainCategoryId={formData.mainCategoryId}
					categoryId={formData.categoryId}
					brandId={formData.brandId}
					modelId={formData.modelId}
					serial={formData.serial}
					activo={formData.activo}
					employeeId={formData.employeeId}
					locationId={formData.locationId}
					stockNumber={formData.stockNumber}
					observation={formData.observation}
					errorStatusId={errors.statusId}
					errorMainCategoryId={errors.mainCategoryId}
					errorCategoryId={errors.categoryId}
					errorBrandId={errors.brandId}
					errorModelId={errors.modelId}
					errorSerial={errors.serial}
					errorActivo={errors.activo}
					errorEmployeeId={errors.employeeId}
					errorLocationId={errors.locationId}
					errorStockNumber={errors.stockNumber}
					errorObservation={errors.observation}
					disabledStatusId={disabled.statusId}
					disabledMainCategoryId={disabled.mainCategoryId}
					disabledCategoryId={disabled.categoryId}
					disabledBrandId={disabled.brandId}
					disabledModelId={disabled.modelId}
					disabledSerial={disabled.serial}
					disabledActivo={disabled.activo}
					disabledEmployeeId={disabled.employeeId}
					disabledLocationId={disabled.locationId}
					disabledStockNumber={disabled.stockNumber}
					disabledObservation={disabled.observation}
					requiredStatusId={required.statusId}
					requiredMainCategoryId={required.mainCategoryId}
					requiredCategoryId={required.categoryId}
					requiredBrandId={required.brandId}
					requiredModelId={required.modelId}
					requiredSerial={required.serial}
					requiredActivo={required.activo}
					requiredEmployeeId={required.employeeId}
					requiredLocationId={required.locationId}
					requiredStockNumber={required.stockNumber}
					requiredObservation={required.observation}
				/>
				<Suspense>
					{formData.categoryId === CategoryOptions.MFP ? (
						<AddMFPFeatures
							ipAddress={formData.ipAddress}
							handleChange={handleChange}
							error={errors.ipAddress}
						/>
					) : formData.categoryId === CategoryOptions.HARDDRIVE ? (
						<AddHardDriveFeatures
							hardDriveCapacityId={formData.hardDriveCapacityId}
							hardDriveTypeId={formData.hardDriveTypeId}
							health={formData.health}
							errorsHealth={errors.health}
							handleChange={handleChange}
						/>
					) : null}
				</Suspense>
			</FormContainer>
		</Suspense>
	)
}
