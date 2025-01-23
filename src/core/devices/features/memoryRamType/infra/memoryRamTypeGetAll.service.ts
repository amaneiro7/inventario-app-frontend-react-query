import { fetching } from '@/api/api'
import { type MemoryRamTypeGetAllRepository } from '../domain/repository/MemoryRamTypeGetAllRepository'
import { type MemoryRamTypeDto } from '../domain/dto/MemoryRamType.dto'
import { memoryRamTypeUrl } from '../domain/entity/baseUrl'

export class MemoryRamTypeGetAllService
	implements MemoryRamTypeGetAllRepository
{
	async getAll(): Promise<MemoryRamTypeDto[]> {
		return await fetching<MemoryRamTypeDto[]>({
			url: memoryRamTypeUrl,
			method: 'GET'
		})
	}
}
