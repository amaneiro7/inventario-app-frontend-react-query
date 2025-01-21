import { fetching } from '@/api/api'
import { type InputTypeDto } from '../domain/dto/InputType.dto'
import { type InputTypeGetAllRepository } from '../domain/repository/InputTypeGetAllRepository'
import { inputTypeUrl } from '../domain/entity/baseUrl'

export class InputTypeGetAllService implements InputTypeGetAllRepository {
	async getAll(): Promise<InputTypeDto[]> {
		return await fetching<InputTypeDto[]>({
			url: inputTypeUrl,
			method: 'GET'
		})
	}
}
