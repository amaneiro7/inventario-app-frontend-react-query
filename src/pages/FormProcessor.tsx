import { useCreateProcessor } from '@/entities/devices/features/processor/infra/hooks/useCreateProcessor'
import { FormLayout } from '@/widgets/FormContainer/FormLayout'
import { ProcessorInputs } from '@/entities/devices/features/processor/infra/ui/ProcessorInputs'
import { ProcessorSearch } from '@/features/processor-search/ui/ProcessorSearch'

export default function FormProcessor() {
	const { formData, key, mode, errors, handleChange, handleSubmit, resetForm } =
		useCreateProcessor()

	return (
		<FormLayout
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
		</FormLayout>
	)
}
