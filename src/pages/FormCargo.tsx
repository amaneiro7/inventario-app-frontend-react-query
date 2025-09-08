import { lazy, Suspense } from 'react'
import { useCreateCargo } from '@/entities/employee/cargo/infra/hook/useCreateCargo'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { CargoFormSkeletonLayout } from '@/entities/employee/cargo/infra/ui/CargoFormSkeletonLayout'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'

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
		mode,
		key,
		errors,
		required,
		disabled,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateCargo()

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
					handleSubmit={handleSubmit}
					isError={isError}
					isNotFound={isNotFound}
					onRetry={onRetry}
					reset={mode === 'edit' ? resetForm : undefined}
					url="/form/cargo/add"
					border
					lastUpdated={formData.updatedAt}
					searchInput={<CargoSearch />}
				>
					<Suspense fallback={<CargoFormSkeletonLayout />}>
						<CargoInputs
							isLoading={isLoading}
							required={required}
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
