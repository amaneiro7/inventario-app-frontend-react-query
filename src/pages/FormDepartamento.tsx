import { lazy, Suspense } from 'react'
import { useCreateDepartamento } from '@/entities/employee/departamento/infra/hook/useCreateDepartamento'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const DepartamentoInputs = lazy(() =>
	import('@/entities/employee/departamento/infra/ui/DepartamentoInputs').then(m => ({
		default: m.DepartamentoInputs
	}))
)
const DepartamentoSearch = lazy(() =>
	import('@/features/departamento-search/ui/DepartamentoSearch').then(m => ({
		default: m.DepartamentoSearch
	}))
)

export default function FormDepartamento() {
	const {
		formData,
		mode,
		key,
		errors,
		required,
		disabled,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateDepartamento()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos del departamento el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/departamento/add"
				border
				lastUpdated={formData.updatedAt}
				searchInput={<DepartamentoSearch />}
			>
				<DepartamentoInputs
					isLoading={isLoading}
					required={required}
					formData={formData}
					disabled={disabled}
					handleChange={handleChange}
					errors={errors}
					mode={mode}
				/>
			</FormLayout>
		</Suspense>
	)
}
