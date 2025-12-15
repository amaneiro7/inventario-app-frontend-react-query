import { lazy, Suspense } from 'react'
import { useCreatePermissionGroup } from '@/entities/accessControl/permissionGroup/infra/hooks/useCreatePermissionGroup'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { PermissionGroupFormSkeletonLayout } from '@/entities/accessControl/permissionGroup/infra/ui/PermissionGroupFormLayoutSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

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
		hasChanges,
		isSubmitting,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreatePermissionGroup()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.PERMISSION_GROUPS.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
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
					url="/form/permission-groups/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<PermissionGroupSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<PermissionGroupFormSkeletonLayout />}>
						<PermissionGroupInputs
							canEdit={canEdit}
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
