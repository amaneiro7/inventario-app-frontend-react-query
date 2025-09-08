import { lazy, Suspense } from 'react'
import { useCreateCentroTrabajo } from '@/entities/employee/centroTrabajo/infra/hook/useCreateCentroTrabajo'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const CentroTrabajoInputs = lazy(() =>
	import('@/entities/employee/centroTrabajo/infra/ui/CentroTrabajoInputs').then(m => ({
		default: m.CentroTrabajoInputs
	}))
)
const CentroTrabajoSearch = lazy(() =>
	import('@/features/centro-trabajo-search/ui/CentroTrabajoSearch').then(m => ({
		default: m.CentroTrabajoSearch
	}))
)

export default function FormCentroTrabajo() {
	const {
		formData,
		mode,
		key,
		errors,
		disabled,
		required,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateCentroTrabajo()

	return (
		<Suspense fallback={<FormSkeletonLayout />}>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="No se pudo cargar el formulario."
					/>
				)}
			>
				<FormLayout
					id={key}
					description="Ingrese los datos del cenrto de Trabajo el cual desea registar."
					isAddForm={mode === 'add'}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? resetForm : undefined}
					url="/form/centrotrabajo/add"
					border
					lastUpdated={formData.updatedAt}
					searchInput={<CentroTrabajoSearch />}
				>
					<CentroTrabajoInputs
						isLoading={isLoading}
						required={required}
						formData={formData}
						disabled={disabled}
						handleChange={handleChange}
						errors={errors}
						mode={mode}
					/>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
