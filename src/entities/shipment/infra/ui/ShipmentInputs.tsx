import { lazy, memo, use, useMemo } from 'react'
import { AuthContext } from '@/app/providers/AuthContext'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'
import {
	type ShipmentErrors,
	type Action,
	type DefaultShipment,
	type ShipmentRequired,
	type ShipmentDisabled
} from '@/entities/shipment/infra/reducers/shipmentFormReducers'

const Input = lazy(() => import('@/shared/ui/Input/Input').then(m => ({ default: m.Input })))
const ShipmentStatusCombobox = lazy(() =>
	import('./ShipmentStatusComboBox').then(m => ({ default: m.ShipmentStatusCombobox }))
)
const ShipmentReasonCombobox = lazy(() =>
	import('./ShipmentReasonComboBox').then(m => ({ default: m.ShipmentReasonCombobox }))
)
const EmployeeCombobox = lazy(() =>
	import('@/entities/employee/employee/infra/ui/EmployeeComboBox').then(m => ({
		default: m.EmployeeCombobox
	}))
)
const SiteCombobox = lazy(() =>
	import('@/entities/locations/site/infra/ui/SiteCombobox').then(m => ({
		default: m.SiteCombobox
	}))
)
const DeviceTransferList = lazy(() =>
	import('@/features/device-transfer-list/ui/DeviceTransferList').then(m => ({
		default: m.DeviceTransferList
	}))
)

interface ShipmentInputsProps {
	formData: DefaultShipment
	errors?: ShipmentErrors
	required?: ShipmentRequired
	disabled?: ShipmentDisabled
	mode: FormMode
	isLoading: boolean
	handleChange: (name: Action['type'], value: string) => void
}

/**
 * `ShipmentInputs`
 * @component
 * @description Componente que renderiza los campos de entrada para la entidad `Shipment`.
 * Incluye el nombre de la marca y la lista de categorías asociadas.
 * @param {object} props - Las propiedades del componente.
 * @param {DefaultShipment} props.formData - Los datos del formulario de la marca.
 * @param {ShipmentErrors} [props.errors] - Los errores de validación para los campos del formulario.
 * @param {(name: Action['type'], value: string) => void} props.handleChange - Función de callback para manejar los cambios en los campos de entrada.
 */
export const ShipmentInputs = memo(
	({
		required,
		disabled,
		errors,
		mode,
		isLoading,
		formData,
		handleChange
	}: ShipmentInputsProps) => {
		const {
			auth: { user }
		} = use(AuthContext)
		const sentBy = useMemo(
			() => (mode === 'add' ? `${user?.name} ${user?.lastName}` : (formData?.sentBy ?? '')),
			[mode, formData.sentBy]
		)
		return (
			<div className="grid gap-4 md:grid-cols-2">
				<ShipmentStatusCombobox
					value={formData.status}
					handleChange={(_name, value) => handleChange('status', value as string)}
					name="status"
					mode={mode}
					readonly={disabled?.status}
					required={required?.status}
					error={errors?.status}
				/>
				<ShipmentReasonCombobox
					value={formData.reason}
					handleChange={(_name, value) => handleChange('reason', value as string)}
					name="reason"
					required={required?.reason}
					error={errors?.reason}
					readonly={mode === 'edit' || disabled?.reason}
				/>

				<SiteCombobox
					handleChange={(_name, value) => handleChange('origin', value as string)}
					name="origin"
					label="Ubicación de origen"
					isLoading={isLoading}
					value={formData.origin}
					method="search"
					required={required?.origin}
					error={errors?.origin}
					readonly={mode === 'edit' || disabled?.origin}
				/>
				<SiteCombobox
					handleChange={(_name, value) => handleChange('destination', value as string)}
					name="destination"
					label="Ubicación de destino"
					isLoading={isLoading}
					value={formData.destination}
					required={required?.destination}
					error={errors?.destination}
					method="search"
					readonly={mode === 'edit' || disabled?.destination}
				/>
				<Input
					value={sentBy}
					label="Enviado por"
					readOnly
					name="sentBy"
					id="sent-by"
					required={required?.sentBy}
					errorMessage={errors?.sentBy}
				/>
				<EmployeeCombobox
					handleChange={(_name, value) => handleChange('receivedBy', value as string)}
					name="receivedBy"
					label="Recibido por"
					isLoading={isLoading}
					readonly={disabled?.receivedBy}
					value={formData.receivedBy}
					required={required?.receivedBy}
					error={errors?.receivedBy}
				/>

				<Input
					id="shipmentDate"
					label="Fecha de envío"
					name="shipmentDate"
					value={formData.shipmentDate}
					transform
					type="date"
					readOnly={mode === 'edit' || disabled?.shipmentDate}
					required={required?.shipmentDate}
					errorMessage={errors?.shipmentDate}
					onChange={e => handleChange('shipmentDate', e.target.value)}
				/>
				<Input
					id="deliveryDate"
					label="Fecha de recepción"
					name="deliveryDate"
					value={formData.deliveryDate}
					transform
					type="date"
					readOnly
					required={required?.deliveryDate}
					errorMessage={errors?.deliveryDate}
					onChange={e => handleChange('deliveryDate', e.target.value)}
				/>
				<Input
					id="tracking-number"
					label="Número de tracking"
					name="trackingNumber"
					value={formData.trackingNumber}
					required={required?.trackingNumber}
					readOnly={disabled?.trackingNumber}
					errorMessage={errors?.trackingNumber}
					onChange={e => handleChange('trackingNumber', e.target.value)}
				/>
				<Input
					id="shipment-observation"
					label="Observación"
					name="observation"
					required={required?.observation}
					errorMessage={errors?.observation}
					value={formData.observation}
					readOnly={disabled?.observation}
					onChange={e => handleChange('observation', e.target.value)}
				/>
				<div className="col-span-2">
					<DeviceTransferList
						name="devices"
						onAddDevice={handleChange}
						onRemoveDevice={handleChange}
						isLoading={isLoading}
						readonly={mode === 'edit'}
						value={formData.deviceIds}
					/>
				</div>
			</div>
		)
	}
)

ShipmentInputs.displayName = 'ShipmentInputs'
