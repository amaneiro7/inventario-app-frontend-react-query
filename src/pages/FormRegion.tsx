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
			description="Busque la región el cual desea registrar en una de las zonas administrativas"
			isAddForm
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/region/"
			border
			standBy={mode !== 'edit'}
			searchInput={<RegionSearch />}
		>
			{mode === 'edit' && (
				<RegionInputs
					required={required}
					formData={formData}
					disabled={disabled}
					handleChange={handleChange}
					errors={errors}
				/>
			)}
		</FormContainer>
	)
}
