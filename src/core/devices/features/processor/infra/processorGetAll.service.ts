import { fetching } from '@/api/api'
import { type ProcessorGetAllRepository } from '../domain/repository/ProcessorGetAllRepository'
import { type ProcessorDto } from '../domain/dto/Processor.dto'
import { processorUrl } from '../domain/entity/baseUrl'

export class ProcessorGetAllService implements ProcessorGetAllRepository {
	async getAll(): Promise<ProcessorDto[]> {
		return await fetching<ProcessorDto[]>({
			url: processorUrl,
			method: 'GET'
		})
	}
}
