import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateLocation } from '@/core/locations/locations/infra/hook/useCreateLocation'
import { LocationInputs } from '@/ui/Form/Location/LocationInputs'
import { LocationSearch } from '@/ui/Form/Location/LocationSearch'

export default function FormLocation() {
	const {
		formData,
		mode,
		key,
		errors,
		required,
		disabled,
		handleChange,
		handleSite,
		handleSubmit,
		resetForm
	} = useCreateLocation()

	return (
		<FormContainer
			id={key}
			title="ubicación"
			description="Ingrese los datos de la ubicación el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/location/add"
			border
			lastUpdated={formData.updatedAt}
			searchInput={<LocationSearch />}
		>
			<LocationInputs
				required={required}
				formData={formData}
				disabled={disabled}
				handleChange={handleChange}
				handleSite={handleSite}
				errors={errors}
				mode={mode}
			/>
		</FormContainer>
	)
}
