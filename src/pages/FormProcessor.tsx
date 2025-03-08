import { useCreateProcessor } from '@/core/devices/features/processor/infra/hooks/useCreateProcessor'
import { FormContainer } from '@/components/FormContainer/formContainer'
import { ProcessorInputs } from '@/ui/Form/Processor/ProcessorInputs'

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
			border
		>
			<ProcessorInputs formData={formData} handleChange={handleChange} errors={errors} />
		</FormContainer>
	)
}
