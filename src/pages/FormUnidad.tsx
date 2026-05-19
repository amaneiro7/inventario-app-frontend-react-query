import { lazy, Suspense } from 'react'
import { useCreateUnidad } from '@/entities/employee/unidad/infra/hook/useCreateUnidad'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { UnidadFormSkeletonLayout } from '@/entities/employee/unidad/infra/ui/UnidadFormLayoutSkeleton.tsx'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const UnidadInputs = lazy(() =>
	import('@/entities/employee/unidad/infra/ui/UnidadInputs').then(m => ({
		default: m.UnidadInputs
	}))
)
const UnidadSearch = lazy(() =>
	import('@/features/unidad-search/ui/UnidadSearch').then(m => ({
		default: m.UnidadSearch
	}))
)

export default function FormUnidad() {
	const {
		formData,
		key,
		mode,
		errors,
		isError,
		isLoading,
		isNotFound,
		hasChanges,
		required,
		disabled,
		isSubmitting,
		submitError,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges,
		handleParentChange
	} = useCreateUnidad()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.UNIDADES.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<UnidadFormSkeletonLayout />
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
					description="Ingrese los datos de la Unidad Organizativa el cual desea registar."
					isAddForm={mode === 'add'}
					isSubmitting={isSubmitting}
					submitError={submitError}
					isDirty={hasChanges}
					isLoading={isLoading}
					lastUpdated={formData?.updatedAt}
					canEdit={canEdit}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/unidad/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<UnidadSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<UnidadFormSkeletonLayout />}>
						<UnidadInputs
							canEdit={canEdit}
							required={required}
							isLoading={isLoading}
							formData={formData}
							disabled={disabled}
							handleChange={handleChange}
							handleParentChange={handleParentChange}
							errors={errors}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
