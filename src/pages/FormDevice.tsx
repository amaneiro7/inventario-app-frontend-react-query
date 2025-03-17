import { useCreateDevice } from '@/core/devices/devices/infra/hook/useCreateDevice'
import { FormContainer } from '@/components/FormContainer/formContainer'
import { SerialSearch } from '@/ui/Form/Device/SerialSearch'
import { DeviceInputs } from '@/ui/Form/Device/DeviceInputs'

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
		<FormContainer
			id={key}
			title="Dispositivo"
			description="Ingrese los datos del dispositivo el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			searchInput={<SerialSearch />}
			reset={mode === 'edit' ? resetForm : undefined}
			lastUpdated={formData.updatedAt}
			updatedBy={formData.history}
			url="/device/add"
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
		</FormContainer>
	)
}
