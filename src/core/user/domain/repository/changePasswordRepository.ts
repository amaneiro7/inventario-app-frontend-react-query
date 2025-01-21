import { ChangePassordParams } from '../dto/ChangePasword.dto'

export abstract class ChangePasswordRepository {
	abstract run({
		password,
		newPassword,
		reTypePassword
	}: ChangePassordParams): Promise<{ message: string }>
}
