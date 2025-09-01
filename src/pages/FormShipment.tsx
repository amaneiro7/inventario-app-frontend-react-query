import { lazy, Suspense } from 'react'
import { useCreateShipment } from '@/entities/shipment/infra/hooks/useCreateShipment'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { ShipmentFormSkeletonLayout } from '@/entities/shipment/infra/ui/ShipmentFormLayoutSkeleton'
import { ShipmentDetailsSkeletonLayout } from '@/entities/shipment/infra/ui/ShipmentDetailsLayoutSkeleton'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'

const ShipmentDetails = lazy(() =>
	import('@/widgets/ShipmentDetails').then(m => ({ default: m.ShipmentDetails }))
)
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
		shipmentData,
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
	} = useCreateShipment()
	return (
		<>
			<Tabs defaultValue="form" className="h-full space-y-4">
				<DetailsBoxWrapper position="start">
					<TabsList className="w-fit">
						<TabsTrigger value="form">Formulario</TabsTrigger>
						{mode === 'edit' && (
							<TabsTrigger value="details">Detalles de envio</TabsTrigger>
						)}
					</TabsList>
				</DetailsBoxWrapper>
				<TabsContent value="form" className="space-y-4">
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
									disabled={disabled}
									handleChange={handleChange}
									errors={errors}
								/>
							</Suspense>
						</FormLayout>
					</Suspense>
				</TabsContent>
				<TabsContent value="details">
					<DetailsBoxWrapper className="space-y-6 p-6 pt-4 sm:p-8 sm:pt-4">
						<Suspense fallback={<ShipmentDetailsSkeletonLayout />}>
							<ShipmentDetails data={shipmentData} />
						</Suspense>
					</DetailsBoxWrapper>
				</TabsContent>
			</Tabs>
		</>
	)
}
