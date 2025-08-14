import { type EventManager } from '@/entities/shared/domain/Observer/EventManager'

/**
 * `ApplicationErrorHandler`
 * @class
 * @description Servicio centralizado para manejar errores ocurridos en la capa de aplicación (casos de uso).
 */
export class ApplicationErrorHandler {
	/**
	 * Procesa un error, opcionalmente notifica a través del gestor de eventos y devuelve un objeto de error estandarizado.
	 * @static
	 * @param {unknown} error - El error capturado en el bloque catch.
	 * @param {EventManager} [events] - (Opcional) La instancia del gestor de eventos. Si se proporciona, se notificará el error.
	 * @returns {{ message: string; error: true }} Un objeto de respuesta de error que no rechaza la promesa.
	 */
	static handle(error: unknown, events?: EventManager): { message: string; error: true } {
		// 1. Extraer un mensaje de error legible.
		const errorMessage = error instanceof Error ? error.message : String(error)

		// 2. Si se proporciona un gestor de eventos, notificar el error.
		if (events) {
			events.notify({ type: 'error', message: errorMessage })
		}

		// 3. Devolver un objeto de error estandarizado.
		// Esto es clave para que la promesa del caso de uso se resuelva y no se rechace,
		// evitando el "unhandled promise rejection" en la consola.
		return { message: errorMessage, error: true }
	}
}
