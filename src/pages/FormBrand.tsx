import { useCreateBrand } from '@/core/brand/infra/hooks/useCreateBrand'
import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'

const FormContainer = lazy(async () => import('@/components/FormContainer/formContainer'))
const BrandInputs = lazy(async () =>
	import('@/ui/Form/Brand/BrandInputs').then(m => ({ default: m.BrandInputs }))
)

export default function FormBrand() {
	const location = useLocation()
	const {
		success,
		errorMessage,
		formData,
		mode,
		formAction,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateBrand()

	return (
		<Suspense>
			<FormContainer
				key={location.key}
				action={formAction}
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
				<BrandInputs
					key={location.key}
					formData={formData}
					handleChange={handleChange}
					error={success === false}
					errorMessage={errorMessage}
				/>
			</FormContainer>
		</Suspense>
	)
}
