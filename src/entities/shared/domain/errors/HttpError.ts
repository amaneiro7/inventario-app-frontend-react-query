/**
 * Clase base para todos los errores generados por códigos de estado HTTP.
 * Permite manejar y tipar errores según el código HTTP devuelto por la API.
 */
export class HttpError extends Error {
	constructor(
		message: string,
		public readonly statusCode: number,
		public readonly details?: Record<string, any>
	) {
		super(message)
		this.name = this.constructor.name
		// Establecer el prototipo explícitamente es una buena práctica para la herencia en TS/JS
		Object.setPrototypeOf(this, HttpError.prototype)
	}
}
