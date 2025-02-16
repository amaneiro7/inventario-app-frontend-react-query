import { fetching } from '@/api/api'
import { processorUrl } from '../../domain/entity/baseUrl'
import { type ProcessorGetRepository } from '../../domain/repository/ProcessorGetRepository'
import { type ProcessorDto } from '../../domain/dto/Processor.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type ProcessorId } from '../../domain/value-object/ProcessorId'

export class ProcessorGetService implements ProcessorGetRepository {
	async getById({ id }: { id: Primitives<ProcessorId> }): Promise<ProcessorDto> {
		return await fetching<ProcessorDto>({
			url: `${processorUrl}/${id}`,
			method: 'GET'
		})
	}
}
