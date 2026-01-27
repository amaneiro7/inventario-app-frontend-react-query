import { historyActionConfig } from './historyActionConfig'

/**
 * Genera un array de opciones basado en la configuración de acciones del historial.
 * Útil para selects, comboboxes o leyendas.
 */
export function getHistoryActionOptions() {
	return Object.entries(historyActionConfig).map(([key, config]) => ({
		id: key,
		name: config.text
	}))
}
