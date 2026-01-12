import { HttpError } from './HttpError'

/**
 * Representa un error HTTP 404 Not Found.
 * Se lanza cuando el recurso solicitado no existe en el servidor.
 */
export class BadRequestError extends HttpError {
	constructor(
		message: string = 'La solicitud es inválida o contiene errores.',
		statusCode: number = 404,
		public readonly details?: Record<string, any>
	) {
		super(message, statusCode, details) // Fija el código a 404
		this.name = 'BadRequestError'
		Object.setPrototypeOf(this, BadRequestError.prototype)
	}
}
