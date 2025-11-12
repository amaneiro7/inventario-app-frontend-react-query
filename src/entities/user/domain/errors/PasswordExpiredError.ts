// src/domain/errors/PasswordExpiredError.ts
export class PasswordExpiredError extends Error {
	constructor(public readonly tempToken: string) {
		super("The user's password has expired and must be reset.")
		this.name = 'PasswordExpiredError'
		this.tempToken = tempToken
	}
}
