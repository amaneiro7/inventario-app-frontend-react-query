import { FormContainer } from '@/components/FormContainer/formContainer'
import { useCreateSite } from '@/core/locations/site/infra/hook/useCreateCity'
import { SiteInputs } from '@/ui/Form/Site/SiteInputs'
import { SiteSearch } from '@/ui/Form/Site/SiteSearch'

export default function FormSite() {
	const { formData, mode, key, errors, required, handleChange, handleSubmit, resetForm } =
		useCreateSite()

	return (
		<FormContainer
			id={key}
			title="sitio"
			description="Ingrese los datos del sitio el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/site/add"
			border
			searchInput={<SiteSearch />}
		>
			<SiteInputs
				required={required}
				formData={formData}
				handleChange={handleChange}
				errors={errors}
				mode={mode}
			/>
		</FormContainer>
	)
}
