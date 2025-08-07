import { FormLayout } from '@/widgets/FormContainer/FormLayout'
import { useCreateSite } from '@/entities/locations/site/infra/hook/useCreateCity'
import { SiteInputs } from '@/entities/locations/site/infra/ui/SiteInputs'
import { SiteSearch } from '@/features/site-search/ui/SiteSearch'

export default function FormSite() {
	const { formData, mode, key, errors, required, handleChange, handleSubmit, resetForm } =
		useCreateSite()

	return (
		<FormLayout
			id={key}
			description="Ingrese los datos del sitio el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/site/add"
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
		</FormLayout>
	)
}
