import { fetching } from '@/shared/api/api'
import type { EmployeeSignatureDto } from '../../domain/dto/EmployeeSignature.dto'
import type { EmployeeGetSignatureInfoRepository } from '../../domain/repository/EmployeeGetSignatureInfoRepository'

export class EmployeeGetSignatureInfoService implements EmployeeGetSignatureInfoRepository {
	async get({ identifier }: { identifier: string }): Promise<EmployeeSignatureDto> {
		return await fetching<EmployeeSignatureDto>({
			url: `public/employees/signature/${identifier}`,
			method: 'GET',
			headers: {
				'x-client-id': 'corporate-signature-widget'
			}
		})
	}
}
