import { FormContainer } from '@/widgets/FormContainer/formContainer'
import { useCreateCity } from '@/entities/locations/city/infra/hook/useCreateCity'
import { CityInputs } from '@/ui/Form/City/CityInputs'
import { CitySearch } from '@/ui/Form/City/CitySearch'

export default function FormCity() {
	const { formData, mode, key, errors, required, handleChange, handleSubmit, resetForm } =
		useCreateCity()

	return (
		<FormContainer
			id={key}
			description="Ingrese los datos de la ciudad el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/city/add"
			border
			searchInput={<CitySearch />}
		>
			<CityInputs
				required={required}
				formData={formData}
				handleChange={handleChange}
				errors={errors}
			/>
		</FormContainer>
	)
}
