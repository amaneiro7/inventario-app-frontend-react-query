import { fetching } from '@/api/api'
import { directivaUrl } from '../../domain/entity/baseUrl'
import { type DirectivaGetRepository } from '../../domain/repository/DirectivaGetRepository'
import { type DirectivaDto } from '../../domain/dto/Directiva.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DirectivaId } from '../../domain/value-object/DirectivaId'

export class DirectivaGetService implements DirectivaGetRepository {
	async getById({ id }: { id: Primitives<DirectivaId> }): Promise<DirectivaDto> {
		return await fetching<DirectivaDto>({
			url: `${directivaUrl}/${id}`,
			method: 'GET'
		})
	}
}
