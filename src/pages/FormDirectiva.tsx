import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateDirectiva } from '@/core/employee/directiva/infra/hook/useCreateDirectiva'
import { DirectivaInputs } from '@/ui/Form/Directiva/DirectivaInputs'
import { DirectivaSearch } from '@/ui/Form/Directiva/DirectivaSearch'

export default function FormDirectiva() {
	const { formData, mode, key, errors, required, handleChange, handleSubmit, resetForm } =
		useCreateDirectiva()

	return (
		<FormContainer
			id={key}
			title="directiva"
			description="Ingrese los datos de la directiva el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/directiva/add"
			border
			searchInput={<DirectivaSearch />}
		>
			<DirectivaInputs
				required={required}
				formData={formData}
				handleChange={handleChange}
				errors={errors}
			/>
		</FormContainer>
	)
}
