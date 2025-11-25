import { lazy, Suspense } from 'react'
import { useCreateBrand } from '@/entities/brand/infra/hooks/useCreateBrand'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { BrandFormSkeletonLayout } from '@/entities/brand/infra/ui/BrandFormLayoutSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const BrandInputs = lazy(() =>
	import('@/entities/brand/infra/ui/BrandInputs').then(m => ({ default: m.BrandInputs }))
)
const BrandSearch = lazy(() =>
	import('@/features/brand-search/ui/BrandSearch').then(m => ({ default: m.BrandSearch }))
)

export default function FormBrand() {
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
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateBrand()
	const canEdit = useHasPermission(PERMISSIONS.BRANDS.UPDATE)
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<BrandFormSkeletonLayout />
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
					description="Ingrese los datos de la marca el cual desea registar."
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
					url="/form/brand/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<BrandSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<BrandFormSkeletonLayout />}>
						<BrandInputs
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
