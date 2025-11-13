// src/domain/errors/PasswordExpiredError.ts
export class PasswordExpiredError extends Error {
	constructor(
		message?: string,
		public readonly tempToken?: string | null
	) {
		super(message)
		this.name = 'PasswordExpiredError'
	}
}
