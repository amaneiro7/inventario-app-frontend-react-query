import { useCreateDevice } from '@/core/devices/devices/infra/hook/useCreateDevice'
import { lazy } from 'react'

const FormContainer = lazy(async () =>
	import('@/components/FormContainer/formContainer').then(m => ({ default: m.FormContainer }))
)
const DeviceInputs = lazy(async () =>
	import('@/ui/Form/Device/DeviceInputs').then(m => ({ default: m.DeviceInputs }))
)

export default function FormDevice() {
	const { formData, key, mode, errors, handleChange, handleSubmit, resetForm } = useCreateDevice()

	return (
		<FormContainer
			id={key}
			title="procesador"
			description="Ingrese los datos del procesador el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/Processor/add"
		>
			<DeviceInputs formData={formData} handleChange={handleChange} errors={errors} />
		</FormContainer>
	)
}
