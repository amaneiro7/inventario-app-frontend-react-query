import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
// import { useFormBrand } from '@/sections/Hooks/brand/useFormBrand'

const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))
const FormContainer = lazy(async () => import('@/ui/FormContainer/formContainer'))

export default function FormBrand() {
	const location = useLocation()
	// const {
	// 	isAddForm,
	// 	formData,
	// 	error,
	// 	disabled,
	// 	required,
	// 	processing,
	// 	resetForm,
	// 	handleChange,
	// 	handleClose,
	// 	handleSubmit
	// } = useFormBrand()

	return (
		<Suspense>
			<FormContainer
				key={location.key}
				title="marca"
				description="Ingrese los datos de la marca el cual desea registar."
				// isAddForm={isAddForm}
				// handleSubmit={handleSubmit}
				// handleClose={handleClose}
				// reset={!isAddForm ? resetForm : undefined}
				// isDisabled={processing}
				url="/brand/add"
			>
				<Suspense>
					<Input
						key={location.key}
						// handleChange={handleChange}
						// disabled={disabled}
						// error={error}
						// required={required}
					/>
				</Suspense>
			</FormContainer>
		</Suspense>
	)
}
