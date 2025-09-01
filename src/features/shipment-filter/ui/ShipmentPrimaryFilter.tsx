import { lazy, memo, Suspense, use, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { AuthContext } from '@/app/providers/AuthContext'
import { RoleOptions } from '@/entities/role/domain/entity/RoleOptions'
import { Checkbox } from '@/shared/ui/Checkbox'

const SiteCombobox = lazy(() =>
	import('@/entities/locations/site/infra/ui/SiteCombobox').then(m => ({
		default: m.SiteCombobox
	}))
)
const ShipmentStatusCombobox = lazy(() =>
	import('@/entities/shipment/infra/ui/ShipmentStatusComboBox').then(m => ({
		default: m.ShipmentStatusCombobox
	}))
)
const UserCombobox = lazy(() =>
	import('@/entities/user/infra/ui/UserComboBox').then(m => ({ default: m.UserCombobox }))
)

interface ShipmentPrimaryFilterProps {
	shipmentCode?: string
	status?: string
	destination?: string
	shipmentDate?: string
	deliveryDate?: string
	sentBy?: string
	handleChange: (name: string, value: string | number) => void
}

export const ShipmentPrimaryFilter = memo(
	({
		handleChange,
		shipmentCode,
		status,
		destination,
		shipmentDate,
		deliveryDate,
		sentBy
	}: ShipmentPrimaryFilterProps) => {
		const [localDeliveryDate, setLocalDeliveryDate] = useState(deliveryDate ?? '')
		const [localShipmentDate, setLocalShipmentDate] = useState(shipmentDate ?? '')
		const [localShipmentCode, setLocalShipmentCode] = useState(shipmentCode ?? '')
		const {
			auth: { user }
		} = use(AuthContext)

		const handleMyShipmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			// Si el checkbox está marcado y el objeto `user` existe, filtramos por su ID.
			// De lo contrario, simplemente limpiamos el filtro pasando un string vacío.
			if (e.target.checked && user) {
				handleChange('sentBy', user.id)
			} else {
				handleChange('sentBy', '')
			}
		}
		// El estado del checkbox se deriva de si el filtro 'sentBy' coincide con el id del usuario
		const isFilteringByMe = sentBy === user?.id

		useEffectAfterMount(() => {
			handleChange('shipmentDate', localShipmentDate)
		}, [localShipmentDate])
		useEffectAfterMount(() => {
			handleChange('deliveryDate', localDeliveryDate)
		}, [localDeliveryDate])
		useEffectAfterMount(() => {
			handleChange('shipmentCode', localShipmentCode)
		}, [localShipmentCode])

		useEffectAfterMount(() => {
			if (!deliveryDate) {
				setLocalDeliveryDate('')
			}
		}, [deliveryDate])

		useEffectAfterMount(() => {
			if (!shipmentDate) {
				setLocalShipmentDate('')
			}
		}, [shipmentDate])
		useEffectAfterMount(() => {
			if (!shipmentCode) {
				setLocalShipmentCode('')
			}
		}, [shipmentCode])

		return (
			<>
				{user?.roleId === RoleOptions.COORDINADOR || user?.roleId === RoleOptions.ADMIN ? (
					<Suspense fallback={<InputFallback />}>
						<UserCombobox name="sentBy" handleChange={handleChange} value={sentBy} />
					</Suspense>
				) : (
					<Checkbox
						label="Mostrar solo mis envíos"
						name="sentBy"
						text="Mostrar solo mis envios"
						value={isFilteringByMe}
						onChange={handleMyShipmentsChange}
					/>
				)}
				<Input
					id="shipment-code-search"
					value={localShipmentCode}
					label="Código de envio"
					name="shipmentCode"
					type="search"
					onChange={e => setLocalShipmentCode(e.target.value)}
				/>
				<Suspense fallback={<InputFallback />}>
					<ShipmentStatusCombobox
						value={status}
						handleChange={handleChange}
						name="status"
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<SiteCombobox
						name="destination"
						method="search"
						label="Ubicación de Destino"
						handleChange={handleChange}
						value={destination}
					/>
				</Suspense>
				<Input
					id="ShipmentDate"
					label="Fecha de envio"
					name="shipmentDate"
					value={localShipmentDate}
					transform
					type="date"
					onChange={e => setLocalShipmentDate(e.target.value)}
				/>
				<Input
					id="DeliveryDate"
					label="Fecha de recepcion"
					name="deliveryDate"
					value={localDeliveryDate}
					transform
					type="date"
					onChange={e => setLocalDeliveryDate(e.target.value)}
				/>
			</>
		)
	}
)

ShipmentPrimaryFilter.displayName = 'ShipmentPrimaryFilter'
