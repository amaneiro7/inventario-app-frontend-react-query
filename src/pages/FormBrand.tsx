import { useCreateBrand } from '@/entities/brand/infra/hooks/useCreateBrand'
import { FormLayout } from '@/widgets/FormContainer/FormLayout'
import { BrandInputs } from '@/entities/brand/infra/ui/BrandInputs'
import { BrandSearch } from '@/features/brand-search/ui/BrandSearch'

export default function FormBrand() {
	const { formData, mode, key, errors, handleChange, handleSubmit, resetForm } = useCreateBrand()

	return (
		<FormLayout
			id={key}
			description="Ingrese los datos de la marca el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				window.history.back()
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/form/brand/add"
			border
			searchInput={<BrandSearch />}
		>
			<BrandInputs formData={formData} handleChange={handleChange} errors={errors} />
		</FormLayout>
	)
}
