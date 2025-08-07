import { FormLayout } from '@/widgets/FormContainer/FormLayout'
import { useCreateDirectiva } from '@/entities/employee/directiva/infra/hook/useCreateDirectiva'
import { DirectivaInputs } from '@/entities/employee/directiva/infra/ui/DirectivaInputs'
import { DirectivaSearch } from '@/features/directiva-search/ui/DirectivaSearch'

export default function FormDirectiva() {
	const { formData, mode, key, errors, required, handleChange, handleSubmit, resetForm } =
		useCreateDirectiva()

	return (
		<FormLayout
			id={key}
			description="Ingrese los datos de la directiva el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/directiva/add"
			border
			searchInput={<DirectivaSearch />}
		>
			<DirectivaInputs
				required={required}
				formData={formData}
				handleChange={handleChange}
				errors={errors}
			/>
		</FormLayout>
	)
}
