import { lazy } from 'react'
import { useCreateBrand } from '@/core/brand/infra/hooks/useCreateBrand'

const FormContainer = lazy(async () =>
	import('@/components/FormContainer/formContainer').then(m => ({ default: m.FormContainer }))
)
const BrandInputs = lazy(async () =>
	import('@/ui/Form/Brand/BrandInputs').then(m => ({ default: m.BrandInputs }))
)

export default function FormBrand() {
	const { formData, mode, key, errors, handleChange, handleSubmit, resetForm } = useCreateBrand()

	return (
		<FormContainer
			id={key}
			title="marca"
			description="Ingrese los datos de la marca el cual desea registar."
			isAddForm={mode === 'add'}
			handleSubmit={handleSubmit}
			handleClose={() => {
				return
			}}
			reset={mode === 'edit' ? resetForm : undefined}
			url="/brand/add"
		>
			<BrandInputs formData={formData} handleChange={handleChange} errors={errors} />
		</FormContainer>
	)
}
