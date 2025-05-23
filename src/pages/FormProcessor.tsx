import { useCreateProcessor } from '@/core/devices/features/processor/infra/hooks/useCreateProcessor'
import { FormContainer } from '@/components/FormContainer/formContainer'
import { ProcessorInputs } from '@/ui/Form/Processor/ProcessorInputs'
import { ProcessorSearch } from '@/ui/Form/Processor/ProcessorSearch'

export default function FormProcessor() {
	const { formData, key, mode, errors, handleChange, handleSubmit, resetForm } =
		useCreateProcessor()

	return (
		<FormContainer
			id={key}
			description="Ingrese los datos del procesador el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/Processor/add"
			border
			searchInput={<ProcessorSearch />}
		>
			<ProcessorInputs formData={formData} handleChange={handleChange} errors={errors} />
		</FormContainer>
	)
}
