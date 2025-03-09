import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateCity } from '@/core/locations/city/infra/hook/useCreateCity'
import { CityInputs } from '@/ui/Form/City/CityInputs'
import { CitySearch } from '@/ui/Form/City/CitySearch'

export default function FormCity() {
	const { formData, mode, key, errors, required, handleChange, handleSubmit, resetForm } =
		useCreateCity()

	return (
		<FormContainer
			id={key}
			title="ciudad"
			description="Ingrese los datos de la ciudad el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/city/add"
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
