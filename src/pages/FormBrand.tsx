import { useCreateBrand } from '@/core/brand/infra/hooks/useCreateBrand'
import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'

const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))
const FormContainer = lazy(async () => import('@/components/FormContainer/formContainer'))

export default function FormBrand() {
	const location = useLocation()
	const {
		success,
		errorMessage,
		formAction,
		formData,
		handleChange,
		handleSubmit,
		mode,
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
				<Suspense>
					<Input
						key={location.key}
						value={formData.name}
						name="name"
						label="Nombre de la marca"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('name', e.target.value)
						}
						error={success === false}
						errorMessage={errorMessage}
						required
					/>
				</Suspense>
			</FormContainer>
		</Suspense>
	)
}
