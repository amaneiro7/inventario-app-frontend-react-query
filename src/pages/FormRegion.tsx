import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateRegion } from '@/core/locations/region/infra/hook/useCreateRegion'
import { RegionInputs } from '@/ui/Form/Region/RegionInputs'
import { RegionSearch } from '@/ui/Form/Region/RegionSearch'

export default function FormRegion() {
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
	} = useCreateRegion()

	return (
		<FormContainer
			id={key}
			title="región"
			description="Ingrese los datos de la región el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/region/add"
			border
			searchInput={<RegionSearch />}
		>
			<RegionInputs
				required={required}
				formData={formData}
				disabled={disabled}
				handleChange={handleChange}
				errors={errors}
			/>
		</FormContainer>
	)
}
