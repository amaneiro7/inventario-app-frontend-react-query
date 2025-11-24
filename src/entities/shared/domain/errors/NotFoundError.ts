// src/domain/errors/NotFoundError.ts

import { HttpError } from './HttpError'

/**
 * Representa un error HTTP 404 Not Found.
 * Se lanza cuando el recurso solicitado no existe en el servidor.
 */
export class NotFoundError extends HttpError {
	constructor(
		message: string = 'El recurso solicitado no fue encontrado.',
		statusCode: number = 404,
		public readonly details?: Record<string, any>
	) {
		super(message, statusCode, details) // Fija el código a 404
		this.name = 'NotFoundError'
		Object.setPrototypeOf(this, NotFoundError.prototype)
	}
}
