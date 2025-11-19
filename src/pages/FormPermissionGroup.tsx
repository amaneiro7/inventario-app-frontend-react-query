import { lazy, Suspense } from 'react'
import { useCreatePermissionGroup } from '@/entities/accessControl/permissionGroup/infra/hooks/useCreatePermissionGroup'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { PermissionGroupFormSkeletonLayout } from '@/entities/accessControl/permissionGroup/infra/ui/PermissionGroupFormLayoutSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const PermissionGroupInputs = lazy(() =>
	import('@/entities/accessControl/permissionGroup/infra/ui/PermissionGroupInputs').then(m => ({
		default: m.PermissionGroupInputs
	}))
)
const PermissionGroupSearch = lazy(() =>
	import('@/features/permission-group-search/ui/PermissionGroupSearch').then(m => ({
		default: m.PermissionGroupSearch
	}))
)

export default function FormPermissionGroup() {
	const {
		formData,
		mode,
		key,
		errors,
		isError,
		isLoading,
		// hasChanges,
		// isSubmitting,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreatePermissionGroup()
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<PermissionGroupFormSkeletonLayout />
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
					description="Ingrese los datos del grupo de permisos el cual desea registar."
					isAddForm={mode === 'add'}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? resetForm : undefined}
					url="/form/permission-groups/add"
					border
					searchInput={<PermissionGroupSearch />}
				>
					<Suspense fallback={<PermissionGroupFormSkeletonLayout />}>
						<PermissionGroupInputs
							formData={formData}
							isLoading={isLoading}
							handleChange={handleChange}
							errors={errors}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
