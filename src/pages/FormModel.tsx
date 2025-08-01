import { FormContainer } from '@/widgets/FormContainer/formContainer'
import { useCreateModel } from '@/entities/model/models/infra/hook/useCreateModels'
import { ModelInputs } from '@/ui/Form/Model/ModelInputs'
import { ModelSearch } from '@/ui/Form/Model/ModelSearch'

export default function FormModel() {
	const {
		formData,
		mode,
		key,
		errors,
		disabled,
		required,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateModel()

	return (
		<FormContainer
			id={key}
			description="Ingrese los datos del modelo el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/model/add"
			lastUpdated={formData.updatedAt}
			searchInput={<ModelSearch />}
		>
			<ModelInputs
				required={required}
				disabled={disabled}
				formData={formData}
				handleChange={handleChange}
				errors={errors}
				mode={mode}
			/>
		</FormContainer>
	)
}
