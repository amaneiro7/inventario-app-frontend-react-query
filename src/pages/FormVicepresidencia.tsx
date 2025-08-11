import { lazy, Suspense } from 'react'
import { useCreateVicepresidencia } from '@/entities/employee/vicepresidencia/infra/hook/useCreateVicepresidencia'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const VicepresidenciasInputs = lazy(() =>
	import('@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaInputs').then(m => ({
		default: m.VicepresidenciasInputs
	}))
)
const VicepresidenciaSearch = lazy(() =>
	import('@/features/vicepresidencia-search/ui/VicepresidenciaSearch').then(m => ({
		default: m.VicepresidenciaSearch
	}))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

export default function FormVicepresidencia() {
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
	} = useCreateVicepresidencia()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos de la vicepresidencia el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/vicepresidencia/add"
				border
				searchInput={<VicepresidenciaSearch />}
			>
				<VicepresidenciasInputs
					required={required}
					formData={formData}
					disabled={disabled}
					handleChange={handleChange}
					errors={errors}
					mode={mode}
					isLoading={isLoading}
				/>
			</FormLayout>
		</Suspense>
	)
}
