import type { EmployeeSignatureDto } from '../domain/dto/EmployeeSignature.dto'
import type { EmployeeGetSignatureInfoRepository } from '../domain/repository/EmployeeGetSignatureInfoRepository'

export class EmployeeGetSignatureInfo {
	constructor(
		private readonly employeeGetSignatureInfoRepository: EmployeeGetSignatureInfoRepository
	) {}

	async execute({ identifier }: { identifier: string }): Promise<EmployeeSignatureDto> {
		return await this.employeeGetSignatureInfoRepository.get({ identifier })
	}
}
