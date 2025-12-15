import { lazy, Suspense } from 'react'
import { useCreateVicepresidencia } from '@/entities/employee/vicepresidencia/infra/hook/useCreateVicepresidencia'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { VicepresidenciaFormSkeletonLayout } from '@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaFormLayoutSkeleton.tsx'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

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
		hasChanges,
		isSubmitting,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateVicepresidencia()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.VICEPRESIDENCIAS.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<VicepresidenciaFormSkeletonLayout />
				</FormSkeletonLayout>
			}
		>
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
					description="Ingrese los datos de la vicepresidencia el cual desea registar."
					isAddForm={mode === 'add'}
					isSubmitting={isSubmitting}
					isDirty={hasChanges}
					isLoading={isLoading}
					lastUpdated={formData?.updatedAt}
					canEdit={canEdit}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/vicepresidencia/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<VicepresidenciaSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<VicepresidenciaFormSkeletonLayout />}>
						<VicepresidenciasInputs
							required={required}
							canEdit={canEdit}
							formData={formData}
							disabled={disabled}
							handleChange={handleChange}
							errors={errors}
							mode={mode}
							isLoading={isLoading}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
