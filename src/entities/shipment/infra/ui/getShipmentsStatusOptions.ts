import { shipmentStatusConfig } from './shipmentStatusConfig'

/**
 * Genera un array de opciones basado en la configuración de acciones del historial.
 * Útil para selects, comboboxes o leyendas.
 */
export function getShipmentsStatusOptions() {
	return Object.entries(shipmentStatusConfig).map(([key, config]) => ({
		id: key,
		name: config.text
	}))
}
