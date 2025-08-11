import { lazy, Suspense } from 'react'
import { useCreateVicepresidenciaEjecutiva } from '@/entities/employee/vicepresidenciaEjecutiva/infra/hook/useCreateVicepresidenciaEjecutiva'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'

const VicepresidenciaEjecutivasInputs = lazy(() =>
	import(
		'@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaInputs'
	).then(m => ({ default: m.VicepresidenciaEjecutivasInputs }))
)
const VicepresidenciaEjecutivaSearch = lazy(() =>
	import('@/features/vicepresidencia-ejecutiva-search/ui/VicepresidenciaEjecutivaSearch').then(
		m => ({ default: m.VicepresidenciaEjecutivaSearch })
	)
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)

export default function FormVicepresidenciaEjecutiva() {
	const {
		formData,
		mode,
		key,
		errors,
		required,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateVicepresidenciaEjecutiva()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<FormLayout
				id={key}
				description="Ingrese los datos de la vicepresidencia ejecutiva el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/vicepresidenciaEjecutiva/add"
				border
				searchInput={<VicepresidenciaEjecutivaSearch />}
			>
				<VicepresidenciaEjecutivasInputs
					isLoading={isLoading}
					required={required}
					formData={formData}
					handleChange={handleChange}
					errors={errors}
				/>
			</FormLayout>
		</Suspense>
	)
}
