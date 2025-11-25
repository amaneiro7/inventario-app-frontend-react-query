import { lazy, Suspense } from 'react'
import { useCreateCargo } from '@/entities/employee/cargo/infra/hook/useCreateCargo'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { CargoFormSkeletonLayout } from '@/entities/employee/cargo/infra/ui/CargoFormSkeletonLayout'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { useHasPermission } from '@/shared/lib/hooks/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const CargoInputs = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoInputs').then(m => ({ default: m.CargoInputs }))
)
const CargoSearch = lazy(() =>
	import('@/features/cargo-search/ui/CargoSearch').then(m => ({ default: m.CargoSearch }))
)

export default function FormCargo() {
	const {
		formData,
		key,
		mode,
		errors,
		disabled,
		required,
		isError,
		isLoading,
		isNotFound,
		hasChanges,
		isSubmitting,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges
	} = useCreateCargo()
	const canEdit = useHasPermission(PERMISSIONS.CARGOS.UPDATE)
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<CargoFormSkeletonLayout />
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
					description="Ingrese los datos del Cargo el cual desea registar."
					isAddForm={mode === 'add'}
					canEdit={canEdit}
					isSubmitting={isSubmitting}
					isDirty={hasChanges}
					lastUpdated={formData?.updatedAt}
					isLoading={isLoading}
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? discardChanges : undefined}
					url="/form/cargo/add"
					border
					searchInput={
						<Suspense fallback={<InputFallback />}>
							<CargoSearch />
						</Suspense>
					}
				>
					<Suspense fallback={<CargoFormSkeletonLayout />}>
						<CargoInputs
							isLoading={isLoading}
							required={required}
							canEdit={canEdit}
							formData={formData}
							disabled={disabled}
							handleChange={handleChange}
							errors={errors}
						/>
					</Suspense>
				</FormLayout>
			</ErrorBoundary>
		</Suspense>
	)
}
