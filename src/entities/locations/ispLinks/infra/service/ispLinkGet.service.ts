import { fetching } from '@/shared/api/api'
import { ispLinkUrl } from '../../domain/entity/baseUrl'
import { ISPLinkGetRepository } from '../../domain/repository/ISPLinkGetRepository'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ISPLinkDto } from '../../domain/dto/ISPLink.dto'
import { type ISPLinkId } from '../../domain/value-object/ISPLinkId'

export class ISPLinkGetService implements ISPLinkGetRepository {
	async getById({ id }: { id: Primitives<ISPLinkId> }): Promise<ISPLinkDto> {
		return await fetching<ISPLinkDto>({
			url: `${ispLinkUrl}/${id}`,
			method: 'GET'
		})
	}
}
