import { lazy, Suspense } from 'react'
import { useCreateCentroTrabajo } from '@/entities/employee/centroTrabajo/infra/hook/useCreateCentroTrabajo'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

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
		key,
		mode,
		errors,
		isError,
		isLoading,
		isNotFound,
		required,
		disabled,
		hasChanges,
		isSubmitting,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateCentroTrabajo()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.CENTRO_TRABAJOS.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission

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
					canEdit={canEdit}
					isSubmitting={isSubmitting}
					isDirty={hasChanges}
					isLoading={isLoading}
					lastUpdated={formData?.updatedAt}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/centrotrabajo/add"
					border
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
