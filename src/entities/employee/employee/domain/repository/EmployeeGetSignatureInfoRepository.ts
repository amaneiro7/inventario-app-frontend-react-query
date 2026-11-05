import type { EmployeeSignatureDto } from '../dto/EmployeeSignature.dto'

export abstract class EmployeeGetSignatureInfoRepository {
	abstract get({ identifier }: { identifier: string }): Promise<EmployeeSignatureDto>
}
