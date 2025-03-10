import { fetching } from '@/api/api'
import { type MemoryRamTypeGetAllRepository } from '../../domain/repository/MemoryRamTypeGetAllRepository'
import { type MemoryRamTypeDto } from '../../domain/dto/MemoryRamType.dto'
import { type Response } from '@/core/shared/domain/methods/Response'
import { memoryRamTypeUrl } from '../../domain/entity/baseUrl'

export class MemoryRamTypeGetAllService implements MemoryRamTypeGetAllRepository {
	async getAll(queryParams: string): Promise<Response<MemoryRamTypeDto>> {
		return await fetching({
			url: `${memoryRamTypeUrl}?${queryParams}`,
			method: 'GET'
		})
	}
}
