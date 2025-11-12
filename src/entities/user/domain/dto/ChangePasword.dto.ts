/**
 * Defines the parameters required for changing a user's password.
 */
export interface ChangePassordParams {
	/**
	 * The user's current password.
	 */
	password: string
	/**
	 * The new password to set.
	 */
	newPassword: string
	/**
	 * The re-typed new password for confirmation.
	 */
	reTypePassword: string
}

export interface ChangeExpiredPasswordParams {
	newPassword: string
	reTypePassword: string
	tempToken: string
}
