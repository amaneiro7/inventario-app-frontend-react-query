import { Suspense, lazy } from 'react'
import { useCreateDevice } from '@/entities/devices/devices/infra/hook/useCreateDevice'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

const DeviceInputs = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceForm/DeviceInputs').then(m => ({
		default: m.DeviceInputs
	}))
)
const SerialSearch = lazy(() =>
	import('@/features/device-by-serial-search/ui/SerialSearch').then(m => ({
		default: m.SerialSearch
	}))
)

export default function FormDevice() {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleLocation,
		handleMemory,
		handleModel,
		handleSubmit,
		resetForm
	} = useCreateDevice()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos del dispositivo el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isLoading={isLoading}
				isNotFound={isNotFound}
				onRetry={onRetry}
				searchInput={<SerialSearch />}
				reset={mode === 'edit' ? resetForm : undefined}
				lastUpdated={formData.updatedAt}
				updatedBy={formData.history}
				url="/form/device/add"
			>
				<DeviceInputs
					formData={formData}
					errors={errors}
					required={required}
					disabled={disabled}
					mode={mode}
					handleChange={handleChange}
					handleLocation={handleLocation}
					handleMemory={handleMemory}
					handleModel={handleModel}
				/>
			</FormLayout>
		</Suspense>
	)
}
