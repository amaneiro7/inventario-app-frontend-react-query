import { lazy, Suspense } from 'react'
import { useCreateDirectiva } from '@/entities/employee/directiva/infra/hook/useCreateDirectiva'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { DirectivaFormSkeletonLayout } from '@/entities/employee/directiva/infra/ui/DirectivaFormLayoutSkeleton.tsx'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const DirectivaInputs = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaInputs').then(m => ({
		default: m.DirectivaInputs
	}))
)
const DirectivaSearch = lazy(() =>
	import('@/features/directiva-search/ui/DirectivaSearch').then(m => ({
		default: m.DirectivaSearch
	}))
)

export default function FormDirectiva() {
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
		isSubmitting,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateDirectiva()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.DIRECTIVAS.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<DirectivaFormSkeletonLayout />
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
					description="Ingrese los datos de la directiva el cual desea registar."
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
					url="/form/directiva/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<DirectivaSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<DirectivaFormSkeletonLayout />}>
						<DirectivaInputs
							canEdit={canEdit}
							required={required}
							isLoading={isLoading}
							formData={formData}
							handleChange={handleChange}
							errors={errors}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
