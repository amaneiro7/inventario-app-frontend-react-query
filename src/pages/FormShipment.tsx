import { lazy, Suspense } from 'react'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { useCreateShipment } from '@/entities/shipment/infra/hooks/useCreateShipment'
import { ShipmentFormSkeletonLayout } from '@/entities/shipment/infra/ui/ShipmentFormLayoutSkeleton'

const ShipmentSearch = lazy(() =>
	import('@/features/shipment-search/ui/ShipmentSearch').then(m => ({
		default: m.ShipmentSearch
	}))
)

const FormLayout = lazy(() =>
	import('@/widgets/FormContainer/FormLayout').then(m => ({ default: m.FormLayout }))
)
const ShipmentInputs = lazy(() =>
	import('@/entities/shipment/infra/ui/ShipmentInputs').then(m => ({ default: m.ShipmentInputs }))
)

export default function FormShipment() {
	const {
		formData,
		mode,
		key,
		errors,
		required,
		isError,
		isLoading,
		isNotFound,
		onRetry,
		handleChange,
		handleSubmit,
		resetForm
	} = useCreateShipment()
	return (
		<Suspense
			fallback={
				<FormSkeletonLayout border>
					<ShipmentFormSkeletonLayout />
				</FormSkeletonLayout>
			}
		>
			<FormLayout
				id={key}
				description="Ingrese los datos de la relación de envios el cual desea registar."
				isAddForm={mode === 'add'}
				handleSubmit={handleSubmit}
				isError={isError}
				isNotFound={isNotFound}
				onRetry={onRetry}
				reset={mode === 'edit' ? resetForm : undefined}
				url="/form/shipment/add"
				border
				searchInput={<ShipmentSearch />}
			>
				<Suspense fallback={<ShipmentFormSkeletonLayout />}>
					<ShipmentInputs
						formData={formData}
						isLoading={isLoading}
						mode={mode}
						required={required}
						handleChange={handleChange}
						errors={errors}
					/>
				</Suspense>
			</FormLayout>
		</Suspense>
	)
}
