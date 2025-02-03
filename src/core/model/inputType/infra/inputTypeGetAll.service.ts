import { fetching } from '@/api/api'
import { type InputTypeDto } from '../domain/dto/InputType.dto'
import { type InputTypeGetAllRepository } from '../domain/repository/InputTypeGetAllRepository'
import { type Response } from '@/core/shared/domain/methods/Response'
import { inputTypeUrl } from '../domain/entity/baseUrl'

export class InputTypeGetAllService implements InputTypeGetAllRepository {
	async getAll(queryParams: string): Promise<Response<InputTypeDto>> {
		return await fetching({
			url: `${inputTypeUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
