import { lazy, memo, Suspense, useState } from 'react'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

const SiteCombobox = lazy(() =>
	import('@/entities/locations/site/infra/ui/SiteCombobox').then(m => ({
		default: m.SiteCombobox
	}))
)
const ShipmentReasonCombobox = lazy(() =>
	import('@/entities/shipment/infra/ui/ShipmentReasonComboBox').then(m => ({
		default: m.ShipmentReasonCombobox
	}))
)

const EmployeeCombobox = lazy(() =>
	import('@/entities/employee/employee/infra/ui/EmployeeComboBox').then(m => ({
		default: m.EmployeeCombobox
	}))
)
const DeviceCombobox = lazy(() =>
	import('@/entities/devices/devices/infra/ui/DeviceComboBox').then(m => ({
		default: m.DeviceCombobox
	}))
)

interface ShipmentOtherFilterProps {
	origin?: string
	receivedBy?: string
	trackingNumber?: string
	observation?: string
	reason?: string
	deviceId?: string
	handleChange: (name: string, value: string | number) => void
}

export const ShipmentOtherFilter = memo(
	({
		handleChange,
		reason,
		origin,
		receivedBy,
		trackingNumber,
		observation,
		deviceId
	}: ShipmentOtherFilterProps) => {
		const [localTrackingNumber, setLocalTrackingNumber] = useState(trackingNumber ?? '')
		const [localObservation, setLocalObservation] = useState(observation ?? '')

		useEffectAfterMount(() => {
			handleChange('trackingNumber', localTrackingNumber)
		}, [trackingNumber])
		useEffectAfterMount(() => {
			handleChange('observation', localObservation)
		}, [observation])

		useEffectAfterMount(() => {
			if (!trackingNumber) {
				setLocalTrackingNumber('')
			}
		}, [trackingNumber])
		useEffectAfterMount(() => {
			if (!observation) {
				setLocalObservation('')
			}
		}, [observation])
		return (
			<>
				<ShipmentReasonCombobox value={reason} handleChange={handleChange} name="reason" />
				<Suspense fallback={<InputFallback />}>
					<EmployeeCombobox
						name="receivedBy"
						label="Recibido por"
						handleChange={handleChange}
						value={receivedBy}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<SiteCombobox
						name="origin"
						method="search"
						label="Ubicación de Origen"
						handleChange={handleChange}
						value={origin}
					/>
				</Suspense>
				<Suspense fallback={<InputFallback />}>
					<DeviceCombobox name="deviceId" handleChange={handleChange} value={deviceId} />
				</Suspense>
				<Input
					id="observation-search"
					value={localObservation}
					label="Observación"
					name="observation"
					type="search"
					onChange={e => setLocalObservation(e.target.value)}
				/>
				<Input
					id="tracking-number-search"
					value={localTrackingNumber}
					label="Número de seguimiento"
					name="trackingnumber"
					type="search"
					onChange={e => setLocalTrackingNumber(e.target.value)}
				/>
			</>
		)
	}
)

ShipmentOtherFilter.displayName = 'ShipmentOtherFilter'
