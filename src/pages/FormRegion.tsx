import { FormLayout } from '@/widgets/FormContainer/FormLayout'
import { useCreateRegion } from '@/entities/locations/region/infra/hook/useCreateRegion'
import { RegionInputs } from '@/entities/locations/region/infra/ui/RegionInputs'
import { RegionSearch } from '@/features/region-search/ui/RegionSearch'

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
		<FormLayout
			id={key}
			description="Busque la región el cual desea registrar en una de las zonas administrativas"
			isAddForm
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/region/"
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
		</FormLayout>
	)
}
