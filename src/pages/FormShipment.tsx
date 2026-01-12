import { lazy, Suspense } from 'react'
import { useCreateShipment } from '@/entities/shipment/infra/hooks/useCreateShipment'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { FormSkeletonLayout } from '@/widgets/FormContainer/FormSkeletonLayout'
import { ShipmentFormSkeletonLayout } from '@/entities/shipment/infra/ui/ShipmentFormLayoutSkeleton'
import { ShipmentDetailsSkeletonLayout } from '@/entities/shipment/infra/ui/ShipmentDetailsLayoutSkeleton'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { useHasPermission } from '@/features/auth/hook/useHasPermission'
import { PERMISSIONS } from '@/shared/config/permissions'

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
		submitError,
		onRetry,
		handleChange,
		handleSubmit,
		discardChanges,
		hasChanges,
		isSubmitting
	} = useCreateShipment()
	const hasUpdatePermission = useHasPermission(PERMISSIONS.SHIPMENTS.UPDATE)

	// Si estamos en modo 'add', siempre se puede editar.
	// Si estamos en modo 'edit', solo se puede editar si tiene el permiso de UPDATE.
	const canEdit = mode === 'add' || hasUpdatePermission
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
								description="Ingrese los datos de la relación de envios el cual desea registar."
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
								url="/form/shipment/add"
								border
								searchInput={
									<Suspense fallback={<InputFallback />}>
										<ShipmentSearch />
									</Suspense>
								}
							>
								<Suspense fallback={<ShipmentFormSkeletonLayout />}>
									<ShipmentInputs
										canEdit={canEdit}
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
						</ErrorBoundary>
					</Suspense>
				</TabsContent>
				<TabsContent value="details">
					<DetailsBoxWrapper className="space-y-6 p-6 pt-4 sm:p-8 sm:pt-4">
						<ErrorBoundary
							fallback={({ onReset }) => (
								<WidgetErrorFallback
									onReset={onReset}
									variant="default"
									message="Los detalles del envio no estan disponibles."
								/>
							)}
						>
							<Suspense fallback={<ShipmentDetailsSkeletonLayout />}>
								<ShipmentDetails data={shipmentData} />
							</Suspense>
						</ErrorBoundary>
					</DetailsBoxWrapper>
				</TabsContent>
			</Tabs>
		</>
	)
}
