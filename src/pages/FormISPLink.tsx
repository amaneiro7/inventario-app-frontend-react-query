import { lazy, Suspense } from 'react'
import { useCreateISPLink } from '@/entities/locations/ispLinks/infra/hook/useCreateISPLink'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { ISPLinkFormSkeletonLayout } from '@/entities/locations/ispLinks/infra/ui/ISPLinkFormSkeletonLayout'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const ISPLinkInputs = lazy(() =>
	import('@/entities/locations/ispLinks/infra/ui/ISPLinkInputs').then(m => ({
		default: m.ISPLinkInputs
	}))
)
const ISPLinkSearch = lazy(() =>
	import('@/features/isp-link-search/ui/ISPLinkSearch').then(m => ({ default: m.ISPLinkSearch }))
)

export default function FormISPLink() {
	const {
		formData,
		key,
		mode,
		errors,
		isError,
		isLoading,
		isNotFound,
		hasChanges,
		isSubmitting,
		required,
		submitError,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateISPLink()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.ISP_LINKS.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<ISPLinkFormSkeletonLayout />
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
					description="Ingrese los datos del proveedor de servicio ISP el cual desea registar."
					isAddForm={mode === 'add'}
					handleSubmit={handleSubmit}
					canEdit={canEdit}
					isSubmitting={isSubmitting}
					submitError={submitError}
					isDirty={hasChanges}
					lastUpdated={formData?.updatedAt}
					isLoading={isLoading}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/isplink/add"
					border
					searchInput={<ISPLinkSearch />}
				>
					<Suspense fallback={<ISPLinkFormSkeletonLayout />}>
						<ISPLinkInputs
							isLoading={isLoading}
							required={required}
							canEdit={canEdit}
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
