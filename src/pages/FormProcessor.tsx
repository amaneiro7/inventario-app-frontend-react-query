import { lazy } from 'react'
import { useCreateProcessor } from '@/core/devices/features/processor/infra/hooks/useCreateProcessor'

const FormContainer = lazy(async () =>
	import('@/components/FormContainer/formContainer').then(m => ({ default: m.FormContainer }))
)
const ProcessorInputs = lazy(async () =>
	import('@/ui/Form/Processor/ProcessorInputs').then(m => ({ default: m.ProcessorInputs }))
)

export default function FormProcessor() {
	const { formData, key, mode, errors, handleChange, handleSubmit, resetForm } =
		useCreateProcessor()

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
			<ProcessorInputs formData={formData} handleChange={handleChange} errors={errors} />
		</FormContainer>
	)
}
