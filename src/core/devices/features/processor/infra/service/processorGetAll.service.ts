import { fetching } from '@/api/api'
import { type ProcessorGetAllRepository } from '../../domain/repository/ProcessorGetAllRepository'
import { type ProcessorDto } from '../../domain/dto/Processor.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { processorUrl } from '../../domain/entity/baseUrl'

export class ProcessorGetAllService implements ProcessorGetAllRepository {
	async getAll(queryParams: string): Promise<Response<ProcessorDto>> {
		return await fetching({
			url: `${processorUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
