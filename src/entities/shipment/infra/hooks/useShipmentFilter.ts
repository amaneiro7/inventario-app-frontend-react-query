import { useGenericFilter } from '@/shared/lib/hooks/useHookFilter'
import { ShipmentGetByCriteria } from '../../application/ShipmentGetByCriteria'
import { type ShipmentFilters } from '../../application/createShipmentQueryParams'

/**
 * A React hook for managing Shipment filters.
 * It leverages `useGenericFilter` to provide filtering capabilities based on `ShipmentFilters`.
 * @returns An object containing filter state and handlers for updating filters.
 */
export function useShipmentFilter() {
	return useGenericFilter<ShipmentFilters>({
		defaultPageSize: ShipmentGetByCriteria.defaultPageSize,
		filterKeys: [
			'deviceId',
			'orderBy',
			'orderType',
			'origin',
			'destination',
			'reason',
			'status',
			'deliveryDate',
			'shipmentDate',
			'shipmentCode',
			'sentBy',
			'receivedBy',
			'trackingNumber',
			'observation'
		]
	})
}
