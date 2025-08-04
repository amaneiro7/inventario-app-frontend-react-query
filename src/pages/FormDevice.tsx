import { Suspense, lazy } from 'react'
import { useCreateDevice } from '@/entities/devices/devices/infra/hook/useCreateDevice'
import { FormContainer } from '@/widgets/FormContainer/formContainer'

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
		handleChange,
		handleLocation,
		handleMemory,
		handleModel,
		handleSubmit,
		resetForm
	} = useCreateDevice()

	return (
		<>
			<FormContainer
				id={key}
				description="Ingrese los datos del dispositivo el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				handleClose={() => {
					window.history.back()
				}}
				searchInput={<SerialSearch />}
				reset={mode === 'edit' ? resetForm : undefined}
				lastUpdated={formData.updatedAt}
				updatedBy={formData.history}
				url="/form/device/add"
			>
				<Suspense fallback={<div className="min-h-[455px]" />}>
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
				</Suspense>
			</FormContainer>
		</>
	)
}
